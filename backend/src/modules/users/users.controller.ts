import { Controller, Get, Param, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { ROUTES, SUBROUTES } from 'common/constants';
import { UsersService } from 'modules/users/users.service';

@Controller(ROUTES.USERS)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get(SUBROUTES.ACTIVATE_TOKEN)
  async activateUser(
    @Param('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.usersService.activateUser(token);

    await this.usersService.setCookie(res, userData);

    return res.redirect(this.configService.get('client_url'));
  }
}
