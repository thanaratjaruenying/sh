import { DataSource } from 'typeorm';

import { DATABASE } from '../constants';
import { ConfigService } from '../modules/config/config.service';

const configService: ConfigService = new ConfigService();

export default new DataSource({
  migrations: ['**/src/migrations/*-*.{ts,js}'],
  entities: [],
  type: DATABASE.POSTGRES,
  url: configService.env.POSTGRES_URL,
  migrationsTableName: 'migrations',
});
