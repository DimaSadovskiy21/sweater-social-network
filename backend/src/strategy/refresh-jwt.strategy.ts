import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refreshJwt',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies['refreshToken'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('secret_jwt_refresh'),
    });
  }
  async validate(payload) {
    const { iat, exp, user } = payload;

    return user;
  }
}
