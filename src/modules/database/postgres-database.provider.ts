import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import {
  AccountEntity,
  CompanyEntity,
  MoneyTransfersEntity,
  UserEntity,
  UserPermissionEntity,
} from '../../models';
import { DATABASE, POSTGRES_CONNECTION } from '../../constants';
import { ConfigService } from '../config/config.service';

export function getDatasource(POSTGRES_URL: string) {
  const dataSource = new DataSource({
    type: DATABASE.POSTGRES,
    url: POSTGRES_URL,
    entities: [
      AccountEntity,
      CompanyEntity,
      MoneyTransfersEntity,
      UserEntity,
      UserPermissionEntity,
    ],
    synchronize: false,
    ssl: false,
    namingStrategy: new SnakeNamingStrategy(),
    logging: false,
  });

  return dataSource.initialize();
}
export const postgresDatabaseProvider: ReadonlyArray<Provider> = [
  {
    provide: POSTGRES_CONNECTION,
    useFactory: (configService: ConfigService) => {
      return getDatasource(configService.env.POSTGRES_URL);
    },
    inject: [ConfigService],
  },
];
