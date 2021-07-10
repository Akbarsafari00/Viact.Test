import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {InfrastructureModule} from "./infrastructure/infrastructure.module";
import {FirebaseAuthMiddleware} from "./infrastructure/firebase/middlewares/firebase-auth.middleware";
import {FirebaseModule} from "./infrastructure/firebase/firebase.module";
import {UserModule} from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/viact-test'),
        InfrastructureModule,
        AuthModule,
        UserModule],
    controllers: [AppController],
    providers: [AppService,JwtStrategy],
})
export class AppModule {

}
