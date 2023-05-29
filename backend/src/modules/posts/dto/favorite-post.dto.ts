import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class FavoritePostDto {
  @IsString()
  readonly userId: ObjectId;

  @IsString()
  readonly postId: string;
}
