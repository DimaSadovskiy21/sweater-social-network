import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configurations from 'configurations';
import { UsersModule } from 'modules/users/users.module';
import { AuthModule } from 'modules/auth/auth.module';
import { PostsModule } from './../posts/posts.module';
import { SessionTokenModule } from 'modules/sessionToken/sessionToken.module';
import { MailModule } from 'modules/mail/mail.module';
import { ActionTokenModule } from 'modules/actionToken/actionToken.module';
import { FilesModule } from 'modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('host'),
      }),
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    SessionTokenModule,
    MailModule,
    ActionTokenModule,
    FilesModule,
  ],
})
export class AppModule {}
