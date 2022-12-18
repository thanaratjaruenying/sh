import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch()
  async getUser(
    @Body() signin: any,
    @Res() res: FastifyReply<any>,
  ): Promise<any> {
    res.status(HttpStatus.OK).send();
  }

  @Delete()
  async deleteUser(
    @Body() signin: any,
    @Res() res: FastifyReply<any>,
  ): Promise<void> {
    res.status(HttpStatus.OK).send();
  }
}
