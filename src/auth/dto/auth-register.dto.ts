import {ApiProperty} from "@nestjs/swagger";

export class AuthRegisterDto {
    @ApiProperty({default:'akbarsafari00@gmail.com'})
    email:string;
    @ApiProperty()
    password:string;
    @ApiProperty()
    confirm_password:string;
    @ApiProperty({default:'akbar ahmadi saray'})
    name:string;
}