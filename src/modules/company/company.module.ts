import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repositories/repository.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [RepositoryModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
