import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from 'entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'jwt/jwt.strategy';
import { UserModule } from 'module/user/user.module';
import { UserService } from 'module/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: String(process.env.SECRET_JWT),
      signOptions: { expiresIn: Number(process.env.SECRET_EXPIRE) },
    }),
  ],
  providers: [AuthService,UserService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}

