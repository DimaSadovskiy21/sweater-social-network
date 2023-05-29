import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UploadUserAvatarDto {
  readonly file: Express.Multer.File;

  @IsString()
  readonly userId: ObjectId;
}
