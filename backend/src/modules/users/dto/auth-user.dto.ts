import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class AuthUserDto {
  @IsString()
  readonly _id: string;

  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsBoolean()
  readonly isActivated: boolean;
}
