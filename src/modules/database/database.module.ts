import { Module } from '@nestjs/common';

import { postgresDatabaseProvider } from './postgres-database.provider';

@Module({
  exports: [...postgresDatabaseProvider],
  providers: [...postgresDatabaseProvider],
})
export class DatabaseModule {}
