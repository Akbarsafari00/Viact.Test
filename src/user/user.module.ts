import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {FirebaseModule} from "../infrastructure/firebase/firebase.module";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemaes/user";

@Module({
    imports: [
        FirebaseModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {
}
