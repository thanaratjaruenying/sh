import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { SystemRole } from 'src/interfaces';
import { JwtAuthGuard } from '../../common/jwt/jwt-auth.guard';
import { GetUserDto } from './dto';
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
}
