import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { AccessJwtAuthGuard, RefreshJwtAuthGuard } from 'guards';
import { ROUTES, SUBROUTES } from 'common/constants';
import { CreateUserDto } from 'modules/users/dto';
import { UsersService } from 'modules/users/users.service';

import { ChangePasswordDto, LoginUserDto, ForgotPasswordDto } from './dto';
import { AuthService } from './auth.service';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post(SUBROUTES.REGISTER) async register(
    @Body() createUserDto: CreateUserDto,
  ) {
    const userData = await this.authService.register(createUserDto);

    return userData;
  }

  @Post(SUBROUTES.LOGIN) async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.authService.login(loginUserDto);

    await this.usersService.setCookie(res, userData);

    return userData;
  }

  @Delete(SUBROUTES.LOGOUT)
  @UseGuards(RefreshJwtAuthGuard)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    const { refreshToken } = req.cookies;

    await this.authService.logout(refreshToken);

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    return true;
  }

  @Get()
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async getUserProfile(@Req() req: Request) {
    const userId = req.user['_id'];

    return await this.authService.getUserProfile(userId);
  }

  @Post(SUBROUTES.REFRESH)
  @UseGuards(RefreshJwtAuthGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user['_id'];

    const userData = await this.authService.refresh(userId);

    await this.usersService.setCookie(res, userData);

    return userData;
  }

  @Post(SUBROUTES.FORGOT_PASSWORD)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    return await this.authService.forgotPassword(email);
  }

  @Get(SUBROUTES.FORGOT_PASSWORD_TOKEN)
  async getChangePasswordPage(@Req() req: Request, @Res() res: Response) {
    const token = req.params.token;

    return res.redirect(
      `${this.configService.get('client_url')}/${
        SUBROUTES.CHANGE_PASSWORD
      }/${token}`,
    );
  }

  @Patch(SUBROUTES.CHANGE_PASSWORD)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.authService.changePassword(changePasswordDto);

    await this.usersService.setCookie(res, userData);

    return userData;
  }
}
