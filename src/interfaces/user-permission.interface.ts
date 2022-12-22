import { BaseWithoutId } from './base.interface';

export enum Role {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export interface UserPermission extends BaseWithoutId {
  active: boolean;
  companyId: number;
  role: Role;
  userId: number;
}
