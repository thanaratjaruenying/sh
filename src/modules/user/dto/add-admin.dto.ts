import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt } from 'class-validator';

export class AddAdminDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  readonly userId: number;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  readonly companyId: number;
}
