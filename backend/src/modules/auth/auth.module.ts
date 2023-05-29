import { Module } from '@nestjs/common';

import { AccessJwtStrategy, RefreshJwtStrategy } from 'strategy';
import { UsersModule } from 'modules/users/users.module';
import { SessionTokenModule } from 'modules/sessionToken/sessionToken.module';
import { MailModule } from 'modules/mail/mail.module';
import { ActionTokenModule } from 'modules/actionToken/actionToken.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, SessionTokenModule, MailModule, ActionTokenModule],
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
