import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CompanyRepository } from './company.repository';
import { postgresRepositoriesProviders } from './repository.provider';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  exports: [UserRepository, CompanyRepository],
  providers: [
    CompanyRepository,
    UserRepository,
    ...postgresRepositoriesProviders,
  ],
})
export class RepositoryModule {}
