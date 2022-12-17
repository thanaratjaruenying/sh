import { Base } from './base.interface';

export enum Role {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export interface UserPermission extends Base {
  active: boolean;
  companyId: number;
  role: Role;
  userId: number;
}
