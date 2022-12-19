import { Base } from './base.interface';

export interface Account extends Base {
  companyId: number;
  salary: number;
  userId: number;
}
