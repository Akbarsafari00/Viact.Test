import {ApiProperty} from "@nestjs/swagger";

export class AuthLoginDto {
    @ApiProperty({default:'akbarsafari00@gmail.com'})
    email:string;
    @ApiProperty()
    password:string;
}