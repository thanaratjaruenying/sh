import { Base } from './base.interface';

export enum MoneyTransferStaus {
  APPROVE = 'APPROVE',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export interface MoneyTransfers extends Base {
  companyId: number;
  month: string;
  requestedAmount: number;
  status: MoneyTransferStaus;
  userId: number;
  year: string;
}
