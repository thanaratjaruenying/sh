import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CompanyIdDto {
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  readonly companyId: number;
}
