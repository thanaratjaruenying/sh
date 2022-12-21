import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { AccountRepository } from './account.repository';
import { CompanyRepository } from './company.repository';
import { MoneyTransferRepository } from './money-transfer.repository';
import { postgresRepositoriesProviders } from './repository.provider';
import { UserPermissionRepository } from './user-permission.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  exports: [
    AccountRepository,
    CompanyRepository,
    MoneyTransferRepository,
    UserPermissionRepository,
    UserRepository,
  ],
  providers: [
    AccountRepository,
    CompanyRepository,
    MoneyTransferRepository,
    UserPermissionRepository,
    UserRepository,
    ...postgresRepositoriesProviders,
  ],
})
export class RepositoryModule {}
