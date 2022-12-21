import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { MoneyTransfers } from 'src/interfaces';
import { MONEY_TRANFERS_REPOSITORY_NAME } from '../../constants';
import { MoneyTransfersEntity } from '../../models';

@Injectable()
export class MoneyTransferRepository {
  constructor(
    @Inject(MONEY_TRANFERS_REPOSITORY_NAME)
    private readonly moneyTransferRepo: Repository<MoneyTransfersEntity>,
  ) {}

  async create(
    moneyTransfers: Partial<MoneyTransfers>,
  ): Promise<MoneyTransfers> {
    return this.moneyTransferRepo.save(moneyTransfers);
  }

  async getById(
    userId: number,
    companyId: number,
  ): Promise<ReadonlyArray<MoneyTransfers>> {
    return this.moneyTransferRepo.findBy({
      userId,
      companyId,
    });
  }
}
