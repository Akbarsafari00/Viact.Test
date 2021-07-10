import { UserDto } from "../dto/user.dto";
import { User, UserDocument } from "../schemaes/user";

export class UserMapper {

  static MapToDto(user:UserDocument):UserDto{
    return  {
      _id : user._id,
      email: user.email,
      google_sub: user.google_sub,
      avatar_url: user.google_sub,
      display_name: user.display_name,
    };
  }

}