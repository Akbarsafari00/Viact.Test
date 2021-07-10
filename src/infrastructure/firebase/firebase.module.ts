import { Module } from '@nestjs/common';
import {FirebaseProvider} from "./firebase-provider.service";
import {FirebaseAuthService} from "./services/firebase-auth/firebase-auth.service";



@Module({
  imports: [],
  controllers: [],
  providers: [FirebaseAuthService,FirebaseProvider],
  exports: [FirebaseAuthService,FirebaseProvider],
})
export class FirebaseModule {}
