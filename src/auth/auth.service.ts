import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { FirebaseProvider } from "../infrastructure/firebase/firebase-provider.service";
import admin from "firebase-admin";
import firebase from "firebase";
import { FirebaseLoginErrorCode } from "../infrastructure/firebase/enums/firebase-login.error-code.enum";
import { FirebaseAuthService } from "../infrastructure/firebase/services/firebase-auth/firebase-auth.service";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { FirebaseTokenResult } from "../infrastructure/firebase/abstracts/firebase-token-result";
import { FirebaseUser } from "../infrastructure/firebase/abstracts/firebase-user";
import { AuthUpdateDto } from "./dto/auth-update.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as fs from "fs";
import { AuthRegisterWithGoogleTokenDto } from "./dto/auth-register-with-google-token.dto";
import { createEvalAwarePartialHost } from "ts-node/dist/repl";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { AuthLoginWithGoogleTokenDto } from "./dto/auth-login-with-google-token.dto";

import { OAuth2Client } from "google-auth-library";
import * as bcrypt from "bcrypt";
import { AuthTokenDto } from "./dto/auth-token.dto";
import { UserDto } from "../user/dto/user.dto";
import { UserMapper } from "../user/mapper/user.mapper";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {

  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly firebaseProvider: FirebaseProvider
  ) {
  }


  async Login(dto: AuthLoginDto): Promise<AuthTokenDto> {

    const user = await this.userService.FindWithEmail(dto.email);
    if (!user)
      throw  new UnauthorizedException("cannot found user with this email");

    const validatePassword = bcrypt.compareSync(dto.password, user.password);
    if (validatePassword === false)
      throw  new UnauthorizedException("password is wrong");

    const token = await this.jwtService.signAsync({
      id: user._id,
      email: user.email
    });

    return {
      access_token: token,
      user: UserMapper.MapToDto(user)
    };

  }


  async Register(body: AuthRegisterDto): Promise<AuthTokenDto> {
    if (body.password !== body.confirm_password) {
      throw  new BadRequestException("password and confirm mismatch");
    }

    const findUser = await this.userService.FindWithEmail(body.email);

    if (findUser) throw  new BadRequestException("user already exists with same email");

    const res = await this.userService.Create(body.email, body.password, body.name, null, null);

    const token = await this.jwtService.signAsync({
      id: res._id,
      email: res.email
    });

    return {
      access_token: token,
      user: UserMapper.MapToDto(res)
    };
  }

  async Update(userId: string, body: AuthUpdateDto): Promise<UserDto> {

    const findUser = await this.userService.FindWithId(userId);

    if (!findUser) throw  new NotFoundException("cannot found user");

    if (body.password && body.confirm_password) {
      if (body.password !== body.confirm_password) {
        throw  new BadRequestException("password and confirm mismatch");
      }
      findUser.password = bcrypt.hashSync(body.password, 10);
    }

    if (body.name) {
      findUser.display_name = body.name;
    }

    await findUser.save();
    return UserMapper.MapToDto(findUser);

  }

  async Upload(uid: string, file: Express.Multer.File): Promise<UserDto> {
    const findUser = await this.userService.FindWithId(uid);
    if (!findUser) throw  new NotFoundException("cannot found user");

    findUser.avatar_url = file.path;
    findUser.avatar_data = await fs.readFileSync(file.path);

    await findUser.save();
    return UserMapper.MapToDto(findUser);

  }


  async RegisterWithGoogleToken(body: AuthRegisterWithGoogleTokenDto): Promise<AuthTokenDto> {

    const ticket = await client.verifyIdToken({
      idToken: body.token,
      audience: process.env.GOOGLE_CLIENT_ID  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    const findUser = await this.userService.FindWithEmail(payload.email);

    if (findUser) throw  new BadRequestException("user already exists with same email");

    const res = await this.userService.Create(payload.email, payload.email, payload.name, payload.picture, payload.sub);

    const token = await this.jwtService.signAsync({
      id: res._id,
      email: res.email
    });

    return {
      access_token: token,
      user: UserMapper.MapToDto(res)
    };
  }

  async LoginWithGoogleToken(body: AuthLoginWithGoogleTokenDto): Promise<AuthTokenDto> {

    const ticket = await client.verifyIdToken({
      idToken: body.token,
      audience: process.env.GOOGLE_CLIENT_ID  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    const user = await this.userService.FindWithGoogleSub(payload.sub);

    if (!user) throw new NotFoundException("cannot found user with this account");
    const token = await this.jwtService.signAsync({
      id: user._id,
      email: user.email
    });

    return {
      access_token: token,
      user: UserMapper.MapToDto(user)
    };
  }
}
