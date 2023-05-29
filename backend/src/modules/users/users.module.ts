import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MailModule } from 'modules/mail/mail.module';
import { SessionTokenModule } from 'modules/sessionToken/sessionToken.module';
import { ActionTokenModule } from 'modules/actionToken/actionToken.module';

import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailModule,
    SessionTokenModule,
    ActionTokenModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
