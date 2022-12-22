import { BaseWithoutId } from './base.interface';

export interface Account extends BaseWithoutId {
  companyId: number;
  salary: number;
  userId: number;
}
