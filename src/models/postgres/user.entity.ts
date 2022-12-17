import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { CompanyEntity } from './company.entity';
import { BaseEntity } from '../base.entity';
import { Role, User } from 'src/types';
import { MoneyTransfersEntity } from './money_tranfers.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements User {
  @Column()
  active: boolean;

  @Column()
  companyId: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  role: Role;

  @Column()
  salary: number;

  @ManyToOne(() => CompanyEntity, (company) => company.users)
  company?: CompanyEntity;

  @OneToMany(() => MoneyTransfersEntity, (moneyTransfer) => moneyTransfer.user)
  moneyTransfers?: MoneyTransfersEntity[];
}
