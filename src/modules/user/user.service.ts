import { BusboyFileStream } from '@fastify/busboy';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as csvParser from 'csv-parser';

import {
  MoneyTransferStaus,
  SystemRole,
  User,
  UserPermission,
} from '../../interfaces';
import { ConfigService } from '../config/config.service';
import { getDatasource } from '../database/postgres-database.provider';
import {
  AccountRepository,
  MoneyTransferRepository,
  UserPermissionRepository,
  UserRepository,
} from '../repositories';
import {
  CreateEmployeeInterface,
  ImportEmployeeInterface,
  UpdateEmployeeInterface,
} from './interfaces';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly userPermissionRepo: UserPermissionRepository,
    private readonly accountRepo: AccountRepository,
    private readonly config: ConfigService,
    private readonly moneyTransferRepo: MoneyTransferRepository,
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

    const connection = await getDatasource(this.config.env.POSTGRES_URL);
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let user: User;
    try {
      user = await this.usersRepo.createWithTransaction(
        {
          email,
          firstName,
          lastName,
          phone,
          systemRole: SystemRole.USER,
        },
        queryRunner.manager,
      );
      await Promise.all([
        this.userPermissionRepo.createEmployeePermissionWithTransaction(
          user.id,
          companyId,
          queryRunner.manager,
        ),
        this.accountRepo.createWithTransaction(
          { userId: user.id, companyId, salary },
          queryRunner.manager,
        ),
      ]);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      return Promise.reject(error);
    } finally {
      await queryRunner.release();
    }

    return user;
  }

  async importEmployees(
    companyId: number,
    fileStream: BusboyFileStream,
  ): Promise<any> {
    const employees = [];
    return new Promise((resolve, reject) => {
      fileStream
        .pipe(csvParser())
        .on('data', async (row: ImportEmployeeInterface) => {
          employees.push(
            this.createEmployee({
              ...row,
              companyId,
              salary: Number(row.salary),
            }),
          );
        })
        .on('end', async () => {
          const users = [];
          const results = await Promise.allSettled(employees);
          for (const emp of results) {
            if (emp.status === 'fulfilled') {
              users.push(emp.value);
            } else {
              users.push(emp.reason.detail);
            }
          }

          resolve(users);
        })
        .on('error', (err: Error) => {
          reject(err);
        });
    });
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
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all([
        this.userPermissionRepo.deletePermissionWithTransaction(
          employeeId,
          companyId,
          queryRunner.manager,
        ),
        this.usersRepo.deleteUserWithTransaction(
          employeeId,
          queryRunner.manager,
        ),
      ]);
      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async requestMoneyTransfer(
    employeeEmail: string,
    companyId: number,
    amount: number,
  ) {
    const user = await this.usersRepo.getByEmail(employeeEmail);
    if (!user) {
      throw new BadRequestException('user not found');
    }

    const [transactions, account] = await Promise.all([
      this.moneyTransferRepo.getMoneyTransfersOnCurrentMonth(
        user.id,
        companyId,
      ),
      this.accountRepo.getById(user.id, companyId),
    ]);

    const withdraw = transactions.reduce((prev, curr) => {
      return prev + parseFloat(curr.requestedAmount as any as string);
    }, 0);
    const fiftyPercent = parseFloat(account.salary as any as string) * 0.5;
    const requestAmount = withdraw + amount;
    if (requestAmount > fiftyPercent) {
      throw new BadRequestException('cannot withdraw more than 50% of salary');
    }

    await this.moneyTransferRepo.addMoneyTransfer({
      userId: user.id,
      companyId,
      requestedAmount: amount,
      status: MoneyTransferStaus.PENDING,
    });
  }

  async updateMoneyTransfer(
    moneyTransferId: number,
    status: MoneyTransferStaus,
  ): Promise<void> {
    await this.moneyTransferRepo.updateMoneyTransferStatus(
      moneyTransferId,
      status,
    );
  }
}
