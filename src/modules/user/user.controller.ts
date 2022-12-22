import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';

import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { SystemRole } from 'src/interfaces';
import { JwtAuthGuard } from '../../common/jwt/jwt-auth.guard';
import {
  AddAdminDto,
  DeleteEmployeeDto,
  GetUserDto,
  ImportEmployeeDto,
  UpdateEmployeeDto,
} from './dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(SystemRole.SH, SystemRole.USER)
  @Get()
  async getUser(
    @Query() query: GetUserDto,
    @Res() res: FastifyReply,
  ): Promise<any> {
    const { email } = query;

    const result = await this.userService.getUserByEmail(email);

    res.status(HttpStatus.OK).send(result);
  }

  @Roles(SystemRole.SH)
  @Post('admin')
  async addAdmin(
    @Body() body: AddAdminDto,
    @Res() res: FastifyReply,
  ): Promise<any> {
    const { userId, companyId } = body;

    const result = await this.userService.addAdminToCompany(userId, companyId);

    res.status(HttpStatus.OK).send(result);
  }

  @Roles(SystemRole.USER)
  @Post('employee')
  async createEmployee(
    @Query() body: CreateEmployeeDto,
    @Res() res: FastifyReply,
  ): Promise<any> {
    const result = await this.userService.createEmployee(body);

    res.status(HttpStatus.OK).send(result);
  }

  // @ApiConsumes('multipart/form-data', 'text/csv')
  @Roles(SystemRole.SH, SystemRole.USER)
  @Post('employee/import')
  async upload(
    @Query() query: ImportEmployeeDto,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    const { companyId } = query;
    const data = await req.file();

    if (data.mimetype !== 'text/csv') {
      throw new BadRequestException('Invalid file type');
    }
    const result = await this.userService.importEmployees(companyId, data.file);

    res.status(HttpStatus.OK).send(result);
  }

  @Roles(SystemRole.SH, SystemRole.USER)
  @Get(':email/employee')
  async getEmployee(
    @Param() email: string,
    @Res() res: FastifyReply,
  ): Promise<any> {
    const result = await this.userService.getUserByEmail(email);

    res.status(HttpStatus.OK).send(result);
  }

  @Roles(SystemRole.USER)
  @Patch(':email/employee')
  async updateEmployee(
    @Param() email: string,
    @Body() body: UpdateEmployeeDto,
    @Res() res: FastifyReply,
  ): Promise<any> {
    const result = await this.userService.updateEmployee(email, body);

    res.status(HttpStatus.OK).send(result);
  }

  @Roles(SystemRole.USER)
  @Delete(':email/employee')
  async deleteEmployee(
    @Query() query: DeleteEmployeeDto,
    @Res() res: FastifyReply,
  ): Promise<any> {
    const { userId, companyId } = query;

    await this.userService.deleteEmployee(userId, companyId);

    res.status(HttpStatus.OK).send();
  }
}
