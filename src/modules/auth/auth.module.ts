import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RepositoryModule } from '../repositories/repository.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [RepositoryModule],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
