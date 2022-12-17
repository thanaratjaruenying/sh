import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RepositoryModule } from '../repositories/repository.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
