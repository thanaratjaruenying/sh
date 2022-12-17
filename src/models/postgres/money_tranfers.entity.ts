import { MoneyTransfers, MoneyTransferStaus } from 'src/types';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'money_transfers' })
export class MoneyTransfersEntity extends BaseEntity implements MoneyTransfers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  month: string;

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

  @ManyToOne(() => CompanyEntity)
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (user) => user.moneyTransfers)
  user: UserEntity;
}
