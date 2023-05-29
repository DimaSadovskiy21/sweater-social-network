import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreatePostDto {
  @IsString()
  readonly content: string;

  @IsString()
  readonly author: ObjectId;
}
