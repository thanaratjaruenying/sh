import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from 'src/interfaces';
import { USER_REPOSITORY_NAME } from '../../constants';
import { UserEntity } from '../../models';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userRepo.save(user);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepo.findOneBy({
      email,
    });
  }

  async getById(email: string): Promise<User> {
    return this.userRepo.findOneBy({
      email,
    });
  }
}
