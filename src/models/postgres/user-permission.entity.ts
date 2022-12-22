import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';

import { Role, UserPermission } from 'src/interfaces';
import { BaseEntityWithoutId } from '../base.entity';
import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'user_permissions' })
@Unique(['userId', 'companyId'])
export class UserPermissionEntity
  extends BaseEntityWithoutId
  implements UserPermission
{
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'company_id' })
  companyId: number;

  @Column()
  active: boolean;

  @Column()
  role: Role;

  @ManyToOne(() => UserEntity, (user) => user.userPermissions)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.userPermissions)
  company?: CompanyEntity;
}
