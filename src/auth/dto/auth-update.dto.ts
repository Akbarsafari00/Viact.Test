import {ApiProperty} from "@nestjs/swagger";

export class AuthUpdateDto {

    @ApiProperty()
    password:string;
    @ApiProperty()
    confirm_password:string;
    @ApiProperty({default:'akbar ahmadi saray'})
    name:string;
}