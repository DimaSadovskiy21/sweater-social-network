import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

import { AppModule } from 'app.module';
import { join } from 'path';
import { configurations } from 'configurations';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const client_url = configurations().client_url;

  const corsOptions = {
    origin: client_url,
    credentials: true,
    optionSuccessStatus: 200,
  };

  app.enableCors(corsOptions);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.use(cookieParser());

  const configService = app.get(ConfigService);

  const port = configService.get('port');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
