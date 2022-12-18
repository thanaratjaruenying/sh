import { Injectable } from '@nestjs/common';

import { User } from 'src/interfaces';
import { ConfigService } from '../config/config.service';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly config: ConfigService,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepo.getByEmail(email);
  }
}
