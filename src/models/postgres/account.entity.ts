import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';

import { Account } from 'src/interfaces';
import { BaseEntityWithoutId } from '../base.entity';
import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'accounts' })
@Unique(['userId', 'companyId'])
export class AccountEntity extends BaseEntityWithoutId implements Account {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'company_id' })
  companyId: number;

  @Column()
  salary: number;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.accounts)
  company?: CompanyEntity;
}
