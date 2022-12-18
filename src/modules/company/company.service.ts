import { Injectable } from '@nestjs/common';

import { Company } from 'src/interfaces';
import { CompanyRepository } from '../repositories';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepo: CompanyRepository) {}

  async createCompany(company: Partial<Company>): Promise<Company> {
    return this.companyRepo.create(company);
  }

  async updateCompany(id: number, updates: Partial<Company>): Promise<Company> {
    return this.companyRepo.update(id, updates);
  }

  async deleteCompany(id: number): Promise<void> {
    await this.companyRepo.delete(id);
  }

  async getCompanyById(id: number): Promise<Company> {
    return this.companyRepo.getById(id);
  }
}
