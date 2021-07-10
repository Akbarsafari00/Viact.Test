import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {FirebaseModule} from "../infrastructure/firebase/firebase.module";

import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {GoogleController} from "./google.controller";
import {GoogleStrategy} from "../infrastructure/google/google.strategy";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [UserModule, FirebaseModule,
        PassportModule,
        JwtModule.register({
            secret: "SecretKey20210907",
            signOptions: {expiresIn: '6h'},
        })],
    controllers: [AuthController,GoogleController],
    providers: [AuthService,GoogleStrategy]
})
export class AuthModule {
}
