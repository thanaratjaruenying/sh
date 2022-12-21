import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  readonly email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  companyId: number;

  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  salary: number;
}
