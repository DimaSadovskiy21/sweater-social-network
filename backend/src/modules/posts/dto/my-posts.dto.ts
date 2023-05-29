import { IsString } from 'class-validator';
import { PostsDto } from './posts.dto';

export class MyPostsDto extends PostsDto {
  @IsString()
  readonly userId: string;
}
