import {ApiProperty} from "@nestjs/swagger";

export class AuthLoginWithGoogleTokenDto {

    @ApiProperty()
    token:string;

}