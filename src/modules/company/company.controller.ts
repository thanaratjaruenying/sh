import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { SystemRole } from 'src/interfaces';
import { JwtAuthGuard } from '../../common/jwt/jwt-auth.guard';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { CompanyService } from './company.service';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { GetCompanyDto } from './dto/get.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Roles(SystemRole.SH)
  @Post()
  async create(
    @Body() body: CreateCompanyDto,
    @Res() res: FastifyReply,
  ): Promise<any> {
    const result = await this.companyService.createCompany(body);

    res.status(HttpStatus.OK).send(result);
  }

  @Roles(SystemRole.SH)
  @Patch(':id/update')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateCompanyDto,
    @Res() res: FastifyReply,
  ): Promise<any> {
    const result = await this.companyService.updateCompany(id, body);

    res.status(HttpStatus.OK).send(result);
  }

  @Roles(SystemRole.SH)
  @Get()
  async get(
    @Query() query: GetCompanyDto,
    @Res() res: FastifyReply,
  ): Promise<any> {
    const { id } = query;

    const result = await this.companyService.getCompanyById(id);

    res.status(HttpStatus.OK).send(result);
  }

  @Roles(SystemRole.SH)
  @Delete(':id/delete')
  async delete(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: FastifyReply,
  ): Promise<any> {
    await this.companyService.deleteCompany(id);

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
