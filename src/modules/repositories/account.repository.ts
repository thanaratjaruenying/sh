import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Account } from 'src/interfaces';
import { ACCOUNT_REPOSITORY_NAME } from '../../constants';
import { AccountEntity } from 'src/models';

@Injectable()
export class AccountRepository {
  constructor(
    @Inject(ACCOUNT_REPOSITORY_NAME)
    private readonly accountRepo: Repository<AccountEntity>,
  ) {}

  async create(account: Partial<Account>): Promise<Account> {
    return this.accountRepo.save(account);
  }

  async getById(userId: number, companyId: number): Promise<Account> {
    return this.accountRepo.findOneBy({
      userId,
      companyId,
    });
  }
}
