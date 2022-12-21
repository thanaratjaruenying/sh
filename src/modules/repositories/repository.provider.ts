import { Provider } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';

import {
  ACCOUNT_REPOSITORY_NAME,
  COMPANY_REPOSITORY_NAME,
  MONEY_TRANFERS_REPOSITORY_NAME,
  POSTGRES_CONNECTION,
  USER_PERMISSION_REPOSITORY_NAME,
  USER_REPOSITORY_NAME,
} from '../../constants';
import {
  UserEntity,
  BaseEntity,
  CompanyEntity,
  UserPermissionEntity,
  MoneyTransfersEntity,
} from '../../models';

interface ModelInjection<T> {
  readonly repositoryName: string;
  readonly entity: EntityTarget<T>;
}

interface PostgresModel {
  entity: BaseEntity;
  repositoryName: string;
}

function getPostgresRepositoryProviders(
  modelsToBeInjected: ReadonlyArray<ModelInjection<PostgresModel>>,
): ReadonlyArray<Provider> {
  return modelsToBeInjected.map((modelToBeInjected) => ({
    provide: modelToBeInjected.repositoryName,
    useFactory: (connection: DataSource) =>
      connection.getRepository(modelToBeInjected.entity),
    inject: [POSTGRES_CONNECTION],
  }));
}

const POSTGRES_MODELS: ReadonlyArray<ModelInjection<PostgresModel>> = [
  {
    entity: UserEntity,
    repositoryName: USER_REPOSITORY_NAME,
  },
  {
    entity: CompanyEntity,
    repositoryName: COMPANY_REPOSITORY_NAME,
  },
  {
    entity: UserPermissionEntity,
    repositoryName: USER_PERMISSION_REPOSITORY_NAME,
  },
  {
    entity: MoneyTransfersEntity,
    repositoryName: MONEY_TRANFERS_REPOSITORY_NAME,
  },
  {
    entity: CompanyEntity,
    repositoryName: ACCOUNT_REPOSITORY_NAME,
  },
];

export const postgresRepositoriesProviders =
  getPostgresRepositoryProviders(POSTGRES_MODELS);
