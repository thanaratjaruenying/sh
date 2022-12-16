import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DATABASE } from '../../constants';
import { ConfigService } from '../config/config.service';

@Injectable()
export class PostgresDatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      migrations: ['migrations/*.{ts,js}'],
      entities: ['**/models/postgres/*.entity.{ts,js}'],
      type: DATABASE.POSTGRES,
      url: this.configService.env.POSTGRES_URL,
      migrationsTableName: 'migrations',
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: false,
      ssl: false,
      logging: false,
    };
  }
}
