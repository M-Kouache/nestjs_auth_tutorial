import { Controller, Post, Body,Request, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { LocalGuard } from 'src/utils/guards/local-guard.guard';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
 
    constructor(
        private readonly userService:UserService,
        private authService:AuthService
    ){}

    @Post('signup')
    async createUser(@Body()data:{first_name:string,last_name:string,
    email:string,password:string}): Promise<User>{
        return this.userService.createUser(data)
    }

    @UseGuards(LocalGuard)
    @Post('signin')
    async signUser(@Request() req){
        return this.authService.loginUser(req.user)
    }

    @UseGuards(AuthGuard('google'))
    @Get('/google/redirect')
    async googleAuthRedirect(@Request() req){
        return this.authService.loginGoogleUser(req.user.accessToken)
    }

}
