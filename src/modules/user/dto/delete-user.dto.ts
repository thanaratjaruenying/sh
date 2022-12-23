import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt } from 'class-validator';

export class DeleteEmployeeDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  companyId: number;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  userId: number;
}
