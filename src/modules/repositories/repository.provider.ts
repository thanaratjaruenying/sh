import { Provider } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';

import { POSTGRES_CONNECTION, USER_REPOSITORY_NAME } from '../../constants';
import { UserEntity, BaseEntity } from '../../models';

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
];

export const postgresRepositoriesProviders =
  getPostgresRepositoryProviders(POSTGRES_MODELS);
