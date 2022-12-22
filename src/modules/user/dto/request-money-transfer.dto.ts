import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class RequestMoneyTransferDto {
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  companyId: number;

  @IsString()
  employeeEmail: string;

  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  amount: number;
}
