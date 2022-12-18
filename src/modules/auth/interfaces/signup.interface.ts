import { SystemRole } from 'src/interfaces';

export interface SignupInterface {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  systemRole: SystemRole;
}