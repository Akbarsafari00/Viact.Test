

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDto } from "../dto/user.dto";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    google_sub:string;

    @Prop()
    email:string;

    @Prop()
    password:string;

    @Prop()
    display_name:string;

    @Prop()
    avatar_url:string;

    @Prop({type:'Buffer'})
    avatar_data:Buffer


}

export const UserSchema = SchemaFactory.createForClass(User);
