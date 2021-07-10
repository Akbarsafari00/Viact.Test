import { Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {AuthGuard} from "@nestjs/passport";
import { UserMapper } from "./mapper/user.mapper";
import { Response } from "express";

@Controller('user')
@ApiTags('user')
export class UserController {

    constructor(private readonly userService:UserService) {
    }

    @ApiBearerAuth()
    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async Profile(@Req() req) {
        const user = await this.userService.FindWithId(req.user.id);
        return UserMapper.MapToDto(user);
    }


}
