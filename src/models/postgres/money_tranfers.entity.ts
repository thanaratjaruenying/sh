import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { MoneyTransfers, MoneyTransferStaus, MonthNames } from 'src/interfaces';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'money_transfers' })
export class MoneyTransfersEntity extends BaseEntity implements MoneyTransfers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  month: MonthNames;

  @Column()
  requestedAmount: number;

  @Column()
  status: MoneyTransferStaus;

  @Column()
  year: string;

  @Column()
  companyId: number;

  @Column()
  userId: number;
}
