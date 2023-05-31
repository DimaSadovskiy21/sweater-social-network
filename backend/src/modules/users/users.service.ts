import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

import { ROUTES, SUBROUTES, MAIL } from 'common/constants';
import { APP_ERROR } from 'common/errors';
import { MailService } from 'modules/mail/mail.service';
import { SessionTokenService } from 'modules/sessionToken/sessionToken.service';
import { ActionTokenService } from 'modules/actionToken/actionToken.service';

import { User, UserDocument } from './schemas';
import {
  CreateUserDto,
  AuthUserDto,
  SetFavoritesUserDto,
  ChangeStatusDto,
} from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly sessionTokenService: SessionTokenService,
    private readonly actionTokenService: ActionTokenService,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findUserById(id: ObjectId) {
    return this.userModel.findById(id);
  }

  async deleteUserByEmail(email: string) {
    return this.userModel.deleteOne({ email });
  }

  async setCookie(res: Response, authUserResponse) {
    const refreshExpire = this.configService.get('expire_jwt_refresh');

    res.cookie('refreshToken', authUserResponse.tokens.refreshToken, {
      maxAge: refreshExpire,
      httpOnly: true,
    });

    res.cookie('accessToken', authUserResponse.tokens.accessToken, {
      maxAge: refreshExpire,
      httpOnly: true,
    });
  }

  async setFavorites(setFavoritesUserDto: SetFavoritesUserDto) {
    const { userId, postId } = setFavoritesUserDto;

    const user = await this.findUserById(userId);
    const hasPost = user.favoritesPosts.indexOf(postId);

    return await this.userModel.findByIdAndUpdate(userId, {
      [`${hasPost >= 0 ? '$pull' : '$push'}`]: {
        favoritesPosts: postId,
      },
    });
  }

  async getPublicUser(authUserDto: AuthUserDto) {
    const { _id, username, email, avatar, status, isActivated } = authUserDto;

    return {
      _id,
      username,
      email,
      avatar,
      status,
      isActivated,
    };
  }

  async generateAndSaveTokens(authUserDto: AuthUserDto) {
    const tokens = await this.sessionTokenService.generateJwtToken({
      ...authUserDto,
    });

    const { _id } = authUserDto;

    await this.sessionTokenService.saveToken(_id, tokens.refreshToken);

    return tokens;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const hashedPassword = await this.hashPassword(password);

    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const userToken = await this.actionTokenService.generateAndSaveToken(
      user._id,
    );

    const link = `${this.configService.get('api_url')}/${ROUTES.USERS}/${
      SUBROUTES.ACTIVATE
    }/${userToken.token}`;

    await this.mailService.sendMail({
      email,
      link,
      mailTitle: MAIL.ACTIVATION_ACCOUNT_MAIL_TITLE,
      mailContentTitle: MAIL.ACTIVATION_ACCOUNT_MAIL_CONTENT_TITLE,
    });

    return user;
  }

  async activateUser(token: string) {
    const userLink = await this.actionTokenService.findToken(token);

    if (!userLink) {
      throw new BadRequestException(APP_ERROR.USER_NOT_FOUND);
    }

    const user = await this.findUserById(userLink.user);

    user.isActivated = true;

    await user.save();

    await this.actionTokenService.deleteToken(token);

    const userDto = await this.getPublicUser(user);

    const tokens = await this.generateAndSaveTokens(userDto);

    return { user: userDto, tokens };
  }

  async changeStatus(changeStatusDto: ChangeStatusDto) {
    const { userId, status } = changeStatusDto;

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          status,
        },
      },
      {
        new: true,
      },
    );

    const userDto = await this.getPublicUser(user);

    return userDto;
  }
}
