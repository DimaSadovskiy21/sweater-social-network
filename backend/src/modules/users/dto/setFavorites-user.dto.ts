import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class SetFavoritesUserDto {
  @IsString()
  readonly userId: ObjectId;

  @IsString()
  readonly postId: ObjectId;
}
