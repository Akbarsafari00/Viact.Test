import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {FirebaseAuthGuard} from "../infrastructure/firebase/guards/firebase-auth.guard";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {AuthRegisterDto} from "./dto/auth-register.dto";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import {AuthUpdateDto} from "./dto/auth-update.dto";
import {FirebaseUser} from "../infrastructure/firebase/abstracts/firebase-user";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "../utils/file-upload.utils";
import * as fs from "fs";
import {AuthRegisterWithGoogleTokenDto} from "./dto/auth-register-with-google-token.dto";
import {AuthLoginWithGoogleTokenDto} from "./dto/auth-login-with-google-token.dto";
import { AuthTokenDto } from "./dto/auth-token.dto";
import { UserDto } from "../user/dto/user.dto";

@Controller('auth')
@ApiTags('auth')
export class AuthController {


    constructor(
        private authService: AuthService
    ) { }




    @Post('login')
    @ApiBody({type:AuthLoginDto})
    @ApiResponse({type:AuthTokenDto})
    Login(@Body() body : AuthLoginDto) :Promise<AuthTokenDto>{
        return this.authService.Login(body)
    }

    @Post('register')
    @ApiBody({type:AuthRegisterDto})
    @ApiResponse({type:AuthTokenDto})
    Register(@Body() body : AuthRegisterDto):Promise<AuthTokenDto> {
        return this.authService.Register(body)
    }

    @Post('login-with-google-token')
    @ApiBody({type:AuthLoginWithGoogleTokenDto})
    @ApiResponse({type:AuthTokenDto})
    LoginWithGoogleToken(@Body() body : AuthLoginWithGoogleTokenDto):Promise<AuthTokenDto> {
        return this.authService.LoginWithGoogleToken(body)
    }

    @Post('register-with-google-token')
    @ApiBody({type:AuthRegisterWithGoogleTokenDto})
    @ApiResponse({type:AuthTokenDto})
    RegisterWithGoogleToken(@Body() body : AuthRegisterWithGoogleTokenDto):Promise<AuthTokenDto> {
        return this.authService.RegisterWithGoogleToken(body)
    }

    @ApiBearerAuth()
    @ApiBody({type:AuthUpdateDto})
    @ApiResponse({type:UserDto})
    @UseGuards(AuthGuard('jwt'))
    @Put('update')
    Update(@Req() req,@Body() body:AuthUpdateDto) {
        // or we can use:
        // return req.user;
        return this.authService.Update(req.user.id,body);
    }


    @ApiResponse({type:UserDto})
    @Post('upload')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('profile',{
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    uploadFile(@Req() req,@UploadedFile() file: Express.Multer.File) {

        return this.authService.Upload(req.user.id,file);
    }


}
