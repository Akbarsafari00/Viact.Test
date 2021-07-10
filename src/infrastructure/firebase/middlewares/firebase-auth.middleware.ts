import { Injectable, NestMiddleware } from '@nestjs/common';
import {Request,Response} from "express";
import {FirebaseProvider} from "../firebase-provider.service";

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {

  constructor(private readonly google:FirebaseProvider) {
  }

  async use(request: Request, res: Response, next: () => void) {

    let token = request.headers.authorization;
    if (token) token = token.replace('bearer ', '').replace("Bearer ",'');
    try {
      var verifyToken = await this.google.admin.auth().verifyIdToken(token);
     var user =  await this.google.admin.auth().getUser(verifyToken.uid);
     request.user = user;
    }catch (e) {
      console.log(e);
    }

    next();
  }
}
