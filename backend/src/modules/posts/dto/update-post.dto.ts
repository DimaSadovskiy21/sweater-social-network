import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdatePostDto {
  @IsString()
  readonly userId: ObjectId;

  @IsString()
  readonly postId: string;

  @IsString()
  readonly content: string;
}
