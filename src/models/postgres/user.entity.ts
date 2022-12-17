import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { SystemRole, User } from 'src/types';
import { MoneyTransfersEntity } from './money_tranfers.entity';
import { UserPermissionEntity } from './user-permission.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements User {
  @Column()
  active: boolean;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  systemRole: SystemRole;

  @Column()
  salary: number;

  @OneToMany(() => MoneyTransfersEntity, (moneyTransfer) => moneyTransfer.user)
  moneyTransfers?: ReadonlyArray<MoneyTransfersEntity>;

  @OneToMany(() => UserPermissionEntity, (permission) => permission.user)
  userPermissions?: ReadonlyArray<UserPermissionEntity>;
}
