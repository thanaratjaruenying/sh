import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, Repository, UpdateResult } from 'typeorm';

import { Role, UserPermission } from 'src/interfaces';
import { USER_PERMISSION_REPOSITORY_NAME } from '../../constants';
import { UserPermissionEntity } from '../../models';

@Injectable()
export class UserPermissionRepository {
  constructor(
    @Inject(USER_PERMISSION_REPOSITORY_NAME)
    private readonly userPermissionDb: Repository<UserPermissionEntity>,
  ) {}

  async createAdmin(
    userId: number,
    companyId: number,
  ): Promise<UserPermission> {
    return this.userPermissionDb.save({
      userId,
      companyId,
      role: Role.ADMIN,
    });
  }

  async createEmployeePermission(
    userId: number,
    companyId: number,
  ): Promise<UserPermission> {
    return this.userPermissionDb.save({
      userId,
      companyId,
      role: Role.EMPLOYEE,
    });
  }

  async createEmployeePermissionWithTransaction(
    userId: number,
    companyId: number,
    entityManager: EntityManager,
  ): Promise<UserPermission> {
    return entityManager.getRepository(UserPermissionEntity).save({
      userId,
      companyId,
      role: Role.EMPLOYEE,
    });
  }

  async getByUserId(
    userId: number,
    companyId: number,
  ): Promise<ReadonlyArray<UserPermission>> {
    return this.userPermissionDb.findBy({ userId, companyId });
  }

  async deletePermission(
    userId: number,
    companyId: number,
  ): Promise<UpdateResult> {
    return this.userPermissionDb.update(
      { userId, companyId },
      { active: false },
    );
  }

  async deletePermissionWithTransaction(
    userId: number,
    companyId: number,
    entityManager: EntityManager,
  ): Promise<UpdateResult> {
    return entityManager
      .getRepository(UserPermissionEntity)
      .update({ userId, companyId }, { active: false });
  }
}
