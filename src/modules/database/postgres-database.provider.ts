import { Provider } from '@nestjs/common';
import {
  CompanyEntity,
  MoneyTransfersEntity,
  UserEntity,
  UserPermissionEntity,
} from 'src/models';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DATABASE, POSTGRES_CONNECTION } from '../../constants';
import { ConfigService } from '../config/config.service';

export const postgresDatabaseProvider: ReadonlyArray<Provider> = [
  {
    provide: POSTGRES_CONNECTION,
    useFactory: (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: DATABASE.POSTGRES,
        url: configService.env.POSTGRES_URL,
        entities: [
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
    },
    inject: [ConfigService],
  },
];
