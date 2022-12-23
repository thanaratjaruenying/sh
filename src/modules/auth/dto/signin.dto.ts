import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
