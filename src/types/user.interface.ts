import { Base } from './base.interface';

export enum SystemRole {
  SH = 'SH',
  USER = 'USER',
}

export interface User extends Base {
  active: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  systemRole: SystemRole;
  salary: number;
}
