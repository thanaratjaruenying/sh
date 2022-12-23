import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone: string;
}
