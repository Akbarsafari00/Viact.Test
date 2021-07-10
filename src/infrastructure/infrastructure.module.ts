import { Module } from '@nestjs/common';
import {FirebaseModule} from "./firebase/firebase.module";
import {GoogleStrategy} from "./google/google.strategy";



@Module({
  imports: [FirebaseModule],
  controllers: [],
  providers: [GoogleStrategy],
  exports: [FirebaseModule],
})
export class InfrastructureModule {}
