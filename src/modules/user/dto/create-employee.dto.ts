import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  phone: string;

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
  salary: number;
}
