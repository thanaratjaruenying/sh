import { Base } from './base.interface';

export enum Role {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export interface User extends Base {
  active: boolean;
  companyId: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  salary: number;
}
