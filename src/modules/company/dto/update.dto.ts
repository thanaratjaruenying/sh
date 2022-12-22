import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly address1?: string;

  @IsString()
  @IsOptional()
  readonly address2?: string;

  @IsString()
  @IsOptional()
  readonly district?: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly phone?: string;

  @IsString()
  @IsOptional()
  readonly postcode?: string;

  @IsString()
  @IsOptional()
  readonly province?: string;

  @IsString()
  @IsOptional()
  readonly subdistrict?: string;
}
