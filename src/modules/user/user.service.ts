import { Injectable } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly config: ConfigService,
  ) {}
}
