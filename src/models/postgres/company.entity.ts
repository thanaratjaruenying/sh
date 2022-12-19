import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Company } from '../../interfaces';
import { BaseEntity } from '../base.entity';
import { AccountEntity } from './account.entity';
import { UserPermissionEntity } from './user-permission.entity';

@Entity({ name: 'companies' })
export class CompanyEntity extends BaseEntity implements Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @Column()
  address1: string;

  @Column({ nullable: true })
  address2?: string;

  @Column()
  district: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  postcode: string;

  @Column()
  province: string;

  @Column()
  subdistrict: string;

  @OneToMany(() => UserPermissionEntity, (permission) => permission.user)
  userPermissions?: ReadonlyArray<UserPermissionEntity>;

  @OneToMany(() => AccountEntity, (account) => account.company)
  accounts?: ReadonlyArray<AccountEntity>;
}
