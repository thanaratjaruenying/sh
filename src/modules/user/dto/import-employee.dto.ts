import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ImportEmployeeDto {
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  readonly companyId: number;
}
