import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'accessJwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies['accessToken'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('secret_jwt_access'),
    });
  }
  async validate(payload) {
    const { iat, exp, user } = payload;

    return user;
  }
}
