import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Company } from '../../types';
import { BaseEntity } from '../base.entity';
import { UserEntity } from './user.entity';

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

  @OneToMany(() => UserEntity, (user) => user.company)
  users: UserEntity[];
}
