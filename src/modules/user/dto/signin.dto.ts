import { IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
