import { IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly address1: string;

  @IsString()
  @IsOptional()
  readonly address2?: string;

  @IsString()
  readonly district: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly postcode: string;

  @IsString()
  readonly province: string;

  @IsString()
  readonly subdistrict: string;
}
