import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

import { AccessJwtAuthGuard, RefreshJwtAuthGuard } from 'guards';

import { ROUTES, SUBROUTES } from 'common/constants';
import { UsersService } from 'modules/users/users.service';

import { ChangeStatusDto } from './dto';

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

  @Patch(SUBROUTES.CHANGE_STATUS)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async changeStatus(
    @Req() req: Request,
    @Body() changeStatusDto: ChangeStatusDto,
  ) {
    const userId = req.user['_id'];
    const { status } = changeStatusDto;

    const userData = await this.usersService.changeStatus({ userId, status });

    return userData;
  }
}
