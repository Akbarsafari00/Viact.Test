import {BadRequestException, Injectable} from '@nestjs/common';
import {FirebaseUser} from "../infrastructure/firebase/abstracts/firebase-user";
import {FirebaseAuthService} from "../infrastructure/firebase/services/firebase-auth/firebase-auth.service";
import {InjectModel} from "@nestjs/mongoose";
import { Model } from 'mongoose';
import * as bcrypt  from "bcrypt";
import {User, UserDocument} from "./schemaes/user";

@Injectable()
export  class UserService {

    constructor(
        @InjectModel(User.name) private readonly userDocument: Model<UserDocument>) {
    }

    async Create(email: string, password: string, display_name: string, avatar_url: string, google_sub = null) {
        const document = new this.userDocument({
            email: email,
            password: bcrypt.hashSync(password,10),
            display_name: display_name,
            avatar_url: avatar_url,
            google_sub: google_sub
        });
        await document.save();
        return  document;
    }

    async FindWithGoogleSub(sub:string):Promise<UserDocument>  {
        return this.userDocument.findOne({ google_sub: sub });
    }

    async FindWithEmail(email:string):Promise<UserDocument> {
        return this.userDocument.findOne({ email: email });
    }

    async FindWithId(id:string):Promise<UserDocument>  {
        return  this.userDocument.findById(id);
    }

}
