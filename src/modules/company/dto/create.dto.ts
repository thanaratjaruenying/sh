import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly address1: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly address2?: string;

  @ApiProperty()
  @IsString()
  readonly district: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly phone: string;

  @ApiProperty()
  @IsString()
  readonly postcode: string;

  @ApiProperty()
  @IsString()
  readonly province: string;

  @ApiProperty()
  @IsString()
  readonly subdistrict: string;
}
