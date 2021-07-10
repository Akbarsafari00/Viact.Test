import {Body, Controller, Get, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {FirebaseAuthGuard} from "../infrastructure/firebase/guards/firebase-auth.guard";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {AuthRegisterDto} from "./dto/auth-register.dto";
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {AuthUpdateDto} from "./dto/auth-update.dto";
import {FirebaseUser} from "../infrastructure/firebase/abstracts/firebase-user";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "../utils/file-upload.utils";
import * as fs from "fs";
import {AuthRegisterWithGoogleTokenDto} from "./dto/auth-register-with-google-token.dto";
import {AuthLoginWithGoogleTokenDto} from "./dto/auth-login-with-google-token.dto";

@Controller('google')
@ApiTags('google')
export class GoogleController {

    @Get()
    @UseGuards(AuthGuard('login'))
    async googleAuth(@Req() req) {
    }

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return req.user;
    }

}
