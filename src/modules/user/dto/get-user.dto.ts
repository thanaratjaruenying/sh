import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetUserDto {
  @ApiProperty()
  @IsString()
  readonly email: string;
}
