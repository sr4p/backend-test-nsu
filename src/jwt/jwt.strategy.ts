import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'module/auth/auth.service';
import { AuthJWTDto } from 'module/auth/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: String(process.env.SECRET_JWT),
    });
  }

  async validate(payload: AuthJWTDto) {
    const user = await this.authService.getUserById(payload.id);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}