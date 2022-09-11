import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService:UserService,
        private jwtService:JwtService
    ){}

    async validateUser(email:string,password:string):Promise<any>{

        const user = await this.userService.findUser(email)

        const check_password = await bcrypt.compare(password,user.password)

        if(user && check_password){
            return user
        } 
        
        return null
    }


    async loginUser(user:any){
        const payload = {username:user.email, sub:user.id}
        return{
            access_token: this.jwtService.sign(payload)
        }
    }

}
