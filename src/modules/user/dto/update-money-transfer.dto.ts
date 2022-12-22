import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

import { MoneyTransferStaus } from 'src/interfaces';

export class UpdateMoneyTransferDto {
  @IsInt()
  @Transform((params: TransformFnParams) => Number(params.value))
  moneyTransferId: number;

  @IsString()
  status: MoneyTransferStaus;
}
