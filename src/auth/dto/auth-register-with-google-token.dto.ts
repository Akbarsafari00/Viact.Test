import {ApiProperty} from "@nestjs/swagger";

export class AuthRegisterWithGoogleTokenDto {

    @ApiProperty()
    token:string;

}