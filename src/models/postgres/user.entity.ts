import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { SystemRole, User } from 'src/interfaces';
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
  hash: string;

  @Column()
  salt: string;

  @OneToMany(() => UserPermissionEntity, (permission) => permission.user)
  userPermissions?: ReadonlyArray<UserPermissionEntity>;
}
