import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CompanyIdDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  readonly companyId: number;
}
