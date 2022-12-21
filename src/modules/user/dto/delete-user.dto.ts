import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt } from 'class-validator';

export class DeleteEmployeeDto {
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  companyId: number;

  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  userId: number;
}
