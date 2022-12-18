import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetCompanyDto {
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  readonly id: number;
}
