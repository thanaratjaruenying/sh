import { BadRequestException, Injectable } from '@nestjs/common';

import { SystemRole, User, UserPermission } from 'src/interfaces';
import { ConfigService } from '../config/config.service';
import { getDatasource } from '../database/postgres-database.provider';
import {
  AccountRepository,
  UserPermissionRepository,
  UserRepository,
} from '../repositories';
import { CreateEmployeeInterface, UpdateEmployeeInterface } from './interfaces';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly userPermissionRepo: UserPermissionRepository,
    private readonly accountRepo: AccountRepository,
    private readonly config: ConfigService,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepo.getByEmail(email);
  }

  async addAdminToCompany(
    userId: number,
    companyId: number,
  ): Promise<UserPermission> {
    const user = await this.usersRepo.getById(userId);
    if (!user) {
      throw new BadRequestException();
    }

    return this.userPermissionRepo.createAdmin(userId, companyId);
  }

  async addEmployeeToCompany(
    userId: number,
    companyId: number,
  ): Promise<UserPermission> {
    const user = await this.usersRepo.getById(userId);
    if (!user) {
      throw new BadRequestException();
    }

    return this.userPermissionRepo.createEmployeePermission(userId, companyId);
  }

  async createEmployee(body: CreateEmployeeInterface): Promise<User> {
    const { email, firstName, lastName, phone, companyId, salary } = body;
    const user = await this.usersRepo.create({
      email,
      firstName,
      lastName,
      phone,
      systemRole: SystemRole.USER,
    });

    await Promise.all([
      this.userPermissionRepo.createEmployeePermission(user.id, companyId),
      this.accountRepo.create({ userId: user.id, companyId, salary }),
    ]);

    return user;
  }

  async updateEmployee(
    email: string,
    updates: UpdateEmployeeInterface,
  ): Promise<User> {
    const user = await this.usersRepo.getByEmail(email);
    if (!user) {
      throw new BadRequestException();
    }

    const newUser = Object.assign({}, user, updates);
    return this.usersRepo.updateUser(newUser);
  }

  async deleteEmployee(employeeId: number, companyId: number): Promise<void> {
    const connection = await getDatasource(this.config.env.POSTGRES_URL);

    await connection.manager.transaction(async (transactionalEntityManager) => {
      await Promise.all([
        this.userPermissionRepo.deletePermissionWithTransaction(
          employeeId,
          companyId,
          transactionalEntityManager,
        ),
        this.usersRepo.deleteUserWithTransaction(
          employeeId,
          transactionalEntityManager,
        ),
      ]);
    });
  }
}
