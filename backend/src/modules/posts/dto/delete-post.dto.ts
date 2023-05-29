import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class DeletePostDto {
  @IsString()
  readonly userId: ObjectId;

  @IsString()
  readonly postId: string;
}
