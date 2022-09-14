import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../utils/guards/jwt-auth.guard'
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getUser(@Request() req){
        return this.userService.findUser(req.user.username)
    }

}
