import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(
    @Query() query: GetUserDto,
    @Res() res: FastifyReply<any>,
  ): Promise<any> {
    const { email } = query;

    const result = await this.userService.getUserByEmail(email);

    res.status(HttpStatus.OK).send(result);
  }
}
