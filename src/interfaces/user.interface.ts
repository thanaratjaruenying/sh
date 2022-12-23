import { Base } from './base.interface';

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
  permissions: Record<string, string>;
}
