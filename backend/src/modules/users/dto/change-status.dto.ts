import { IsOptional, MaxLength } from 'class-validator';

export class ChangeStatusDto {
  @IsOptional()
  readonly userId?: string;

  @MaxLength(100)
  readonly status: string;
}
