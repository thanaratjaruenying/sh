import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Company } from '../../interfaces';
import { COMPANY_REPOSITORY_NAME } from '../../constants';
import { CompanyEntity } from '../../models';

@Injectable()
export class CompanyRepository {
  constructor(
    @Inject(COMPANY_REPOSITORY_NAME)
    private readonly companyRepo: Repository<CompanyEntity>,
  ) {}

  async create(company: Partial<Company>): Promise<Company> {
    return this.companyRepo.save({ ...company, active: true });
  }

  async getByEmail(email: string): Promise<Company> {
    return this.companyRepo.findOneBy({
      email,
    });
  }

  async getById(id: number): Promise<Company> {
    return this.companyRepo.findOneBy({
      id,
    });
  }

  async update(id: number, updates: Partial<Company>): Promise<Company> {
    const entity = await this.companyRepo.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }

    return this.companyRepo.save({ ...entity, ...updates });
  }

  async delete(id: number): Promise<void> {
    const entity = await this.companyRepo.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }

    await this.companyRepo.update(id, { active: false });
  }
}
