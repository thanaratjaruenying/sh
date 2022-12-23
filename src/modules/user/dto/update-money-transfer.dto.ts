import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';

import { MoneyTransferStaus } from '../../../interfaces';

export class UpdateMoneyTransferDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  moneyTransferId: number;

  @ApiProperty({
    enum: MoneyTransferStaus,
  })
  @IsEnum(MoneyTransferStaus)
  status: MoneyTransferStaus;
}
