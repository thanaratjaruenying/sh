import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt } from 'class-validator';

export class AddAdminDto {
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  readonly userId: number;

  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  readonly companyId: number;
}
