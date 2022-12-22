import { Base } from './base.interface';
import { Role } from './user-permission.interface';

export enum SystemRole {
  SH = 'SH',
  USER = 'USER',
}

export interface User extends Base {
  active: boolean;
  email: string;
  firstName: string;
  hash?: string;
  lastName: string;
  phone: string;
  salt?: string;
  systemRole: SystemRole;
}

export interface UserToken {
  email: string;
  roles: ReadonlyArray<string>;
  permissions: ReadonlyArray<{ role: Role; companyId: number }>;
}
