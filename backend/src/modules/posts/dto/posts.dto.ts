import { IsNumber } from 'class-validator';

export class PostsDto {
  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly limit: number;
}
