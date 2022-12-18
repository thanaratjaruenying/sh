import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { SystemRole } from 'src/interfaces';

export class SignupDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @ApiProperty({
    description: 'description of the system role',
    enum: SystemRole,
  })
  @IsEnum(SystemRole)
  readonly systemRole: SystemRole;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly phone: string;
}
