import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Auth, google } from 'googleapis'



@Injectable()
export class AuthService {

    private oauthClinet:Auth.OAuth2Client;

    constructor(
        private userService:UserService,
        private jwtService:JwtService
    ){
        const clientId = process.env.GOOGLE_CLIENT_ID
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET
        this.oauthClinet = new google.auth.OAuth2(clientId,clientSecret)
    }

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

    async loginGoogleUser(token:any){
        const userInfo = await this.oauthClinet.getTokenInfo(token)
        if(userInfo){
            return {
                data:userInfo
            }
        }
        return 'empty'
    }

}
