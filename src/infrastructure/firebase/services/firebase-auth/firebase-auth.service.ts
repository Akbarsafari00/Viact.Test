import {Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {FirebaseLoginErrorCode} from "../../enums/firebase-login.error-code.enum";
import {FirebaseProvider} from "../../firebase-provider.service";
import {FirebaseTokenResult} from "../../abstracts/firebase-token-result";
import {FirebaseUser} from "../../abstracts/firebase-user";

@Injectable()
export class FirebaseAuthService {
    constructor(private readonly firebase:FirebaseProvider) {
    }
    async LoginWithEmailAndPassword (email:string,password:string):Promise<FirebaseTokenResult>{
        try {
            const res = await this.firebase.app.auth().signInWithEmailAndPassword(email, password);
            return res.user.getIdTokenResult();
        } catch (e) {
            if (e.code) {
                switch (e.code) {
                    case FirebaseLoginErrorCode.USER_NOT_FOUND:
                        throw  new UnauthorizedException({
                            code: "USER_NOT_FOUND",
                            message: e.message || "USER_NOT_FOUND"
                        });
                    case FirebaseLoginErrorCode.WRONG_PASSWORD:
                        throw  new UnauthorizedException({
                            code: "WRONG_PASSWORD",
                            message: e.message || "WRONG_PASSWORD"
                        });
                }
            }
            return;
        }
    }


    async Register (email:string,password:string,name:string):Promise<FirebaseUser>{
        try {

            return await this.firebase.admin.auth().createUser({
                email: email,
                displayName: name,
                password: password,
            });
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async GetUserById (uid:string):Promise<FirebaseUser>{
        try {
            return this.firebase.admin.auth().getUser(uid);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }


    async Update(userId: string, name: string, password: string) {
        try {
            const properties = {};
            if (name) properties['displayName'] = name;
            if (password) properties['password'] = password;
            return this.firebase.admin.auth().updateUser(userId,properties)
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async UpdatePhotoURL(userId: string, photo: string) {
        try {
            return this.firebase.admin.auth().updateUser(userId,{
                photoURL: photo
            })
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
