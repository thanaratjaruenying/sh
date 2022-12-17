import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { postgresRepositoriesProviders } from './repository.provider';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  exports: [UserRepository],
  providers: [UserRepository, ...postgresRepositoriesProviders],
})
export class RepositoryModule {}
