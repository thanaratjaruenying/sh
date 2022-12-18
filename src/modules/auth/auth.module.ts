import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { RepositoryModule } from '../repositories/repository.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [RepositoryModule, PassportModule],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
