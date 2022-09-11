import { BadRequestException, HttpException, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {

    constructor(private prisma:PrismaService){}

    async createUser(data:Prisma.UserCreateInput):Promise<User>{
        data['password'] = await bcrypt.hash(data.password,10) 
        return this.prisma.user.create({data})
    }

    async findUser(email:string):Promise<User>{
        const user = await this.prisma.user.findUnique({
            where:{
                email
            }
        })
        return user
    }

}
