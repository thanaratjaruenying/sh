import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, Repository, UpdateResult } from 'typeorm';

import { User } from 'src/interfaces';
import { USER_REPOSITORY_NAME } from '../../constants';
import { UserEntity } from '../../models';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private readonly userDb: Repository<UserEntity>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userDb.save(user);
  }

  async createWithTransaction(
    user: Partial<User>,
    entityManager: EntityManager,
  ): Promise<User> {
    return entityManager.getRepository(UserEntity).save(user);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userDb.findOneBy({
      email,
    });
  }

  async getById(id: number): Promise<User> {
    return this.userDb.findOneBy({
      id,
    });
  }

  async updateUser(updates: Partial<User>) {
    return this.userDb.save({
      ...updates,
    });
  }

  async deleteUser(userId: number) {
    return this.userDb.update({ id: userId }, { active: false });
  }

  async deleteUserWithTransaction(
    userId: number,
    entityManager: EntityManager,
  ): Promise<UpdateResult> {
    return entityManager
      .getRepository(UserEntity)
      .update({ id: userId }, { active: false });
  }
}
