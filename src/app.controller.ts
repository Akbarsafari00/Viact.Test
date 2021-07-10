import { Controller, Get, Param, Res } from "@nestjs/common";
import { AppService } from './app.service';
import { Response } from "express";
import { UserService } from "./user/user.service";

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('public/images/:user_id')
  async Picture(@Param('user_id') user_id : string,@Res() res:Response){
    const findUser = await this.userService.FindWithId(user_id);
    res.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Length': findUser.avatar_data.length});
    res.end(findUser.avatar_data);
  }

}
