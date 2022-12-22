import { Inject, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import * as dayjs from 'dayjs';

import {
  MoneyTransfers,
  MoneyTransferStaus,
  MonthNames,
} from '../../interfaces';
import { MONEY_TRANFERS_REPOSITORY_NAME } from '../../constants';
import { MoneyTransfersEntity } from '../../models';

@Injectable()
export class MoneyTransferRepository {
  constructor(
    @Inject(MONEY_TRANFERS_REPOSITORY_NAME)
    private readonly moneyTransferRepo: Repository<MoneyTransfersEntity>,
  ) {}

  async addMoneyTransfer(
    moneyTransfers: Partial<MoneyTransfers>,
  ): Promise<MoneyTransfers> {
    const dayjsIns = dayjs();
    const month = dayjsIns.format('MMMM') as MonthNames;
    const year = dayjsIns.format('YYYY');

    return this.moneyTransferRepo.save({ ...moneyTransfers, month, year });
  }

  async updateMoneyTransferStatus(
    id: number,
    status: MoneyTransferStaus,
  ): Promise<UpdateResult> {
    return this.moneyTransferRepo.update({ id }, { status });
  }

  async getMoneyTransfersOnCurrentMonth(
    userId: number,
    companyId: number,
  ): Promise<ReadonlyArray<MoneyTransfers>> {
    const dayjsIns = dayjs();
    const month = dayjsIns.format('MMMM') as MonthNames;
    const year = dayjsIns.format('YYYY');

    return this.moneyTransferRepo
      .createQueryBuilder()
      .where({
        userId,
        companyId,
        month,
        year,
      })
      .where('status IN (:...status)', {
        status: [MoneyTransferStaus.APPROVE, MoneyTransferStaus.PENDING],
      })
      .getMany();
  }
}
