import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:'isasecret',
      signOptions:{expiresIn:'10s'}
    })
  ],
  providers: [AuthService,LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
