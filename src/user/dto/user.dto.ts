import { Prop } from "@nestjs/mongoose";

export class UserDto  {
  _id:string;
  google_sub:string;
  email:string;
  display_name:string;
  avatar_url:string;
}