import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { AccessJwtAuthGuard, RefreshJwtAuthGuard } from 'guards';
import { ROUTES } from 'common/constants';

import { fileStorage } from './storage';
import { FilesService } from './files.service';

@Controller(ROUTES.FILES)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post()
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  uploadUserAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = req.user['_id'];
    return this.filesService.uploadUserAvatar({ file, userId });
  }
}
