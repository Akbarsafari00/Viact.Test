import { UserDto } from "../../user/dto/user.dto";

export class AuthTokenDto {
  user: UserDto;
  access_token: string;
}