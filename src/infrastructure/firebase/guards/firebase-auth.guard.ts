import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Request} from 'express';
import {FirebaseProvider} from "../firebase-provider.service";

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly google:FirebaseProvider) {
  }
    async canActivate(
        context: ExecutionContext,
    ):   Promise<boolean> {


      const request: Request = context.switchToHttp().getRequest();
      let token = request.headers.authorization;
      if (token) token = token.replace('Bearer ', '').replace('bearer ','');
      try {
        await this.google.admin.auth().verifyIdToken(token);
        return true;
      }catch (e) {
        console.log(e);
        throw new UnauthorizedException();
      }

    }
}
