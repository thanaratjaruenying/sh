import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EnvironmentConfigDto {
  @Expose()
  @IsNumber()
  @Transform((params: TransformFnParams) => Number(params.value))
  readonly PORT: number;

  @Expose()
  @IsOptional()
  @Transform((params: TransformFnParams) =>
    params.value ? params.value : 'development',
  )
  readonly NODE_ENV: string;

  @Expose()
  @IsString()
  readonly POSTGRES_URL: string;

  @Expose()
  @IsString()
  @Transform((params: TransformFnParams) =>
    params.value ? params.value : 'secret',
  )
  readonly SECRET_KEY: string;
}
