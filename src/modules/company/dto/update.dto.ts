import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly address1?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly address2?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly district?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly postcode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly province?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly subdistrict?: string;
}
