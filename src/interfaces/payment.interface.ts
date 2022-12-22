import { Base } from './base.interface';

export enum MoneyTransferStaus {
  APPROVE = 'APPROVE',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export enum MonthNames {
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December',
}

export interface MoneyTransfers extends Base {
  companyId: number;
  month: MonthNames;
  requestedAmount: number;
  status: MoneyTransferStaus;
  userId: number;
  year: string;
}
