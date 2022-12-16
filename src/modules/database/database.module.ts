import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { postgresDatabaseProvider } from './postgres-database.provider';
import { PostgresDatabaseConfigService } from './postgres-database-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresDatabaseConfigService,
    }),
  ],
  exports: [],
  providers: [],
})
export class DatabaseModule {}
