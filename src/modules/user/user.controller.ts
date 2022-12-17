import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { SignupDto } from './dto';
import { SigninDto } from './dto/signin.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() signup: SignupDto, @Res() res: FastifyReply<any>) {
    const result = await this.userService.signup(signup);

    res.status(HttpStatus.OK).send(result);
  }

  @Post('signin')
  async signin(@Body() signin: SigninDto, @Res() res: FastifyReply<any>) {
    const result = await this.userService.signin(signin);

    // Store the JWT in a cookie
    res.header('Set-Cookie', `token=${result}; HttpOnly`);

    res.status(HttpStatus.OK).send(result);
  }

  // @Patch()
  // async getUser(): Promise<Cat[]> {
  //   return this.userService.get();
  // }

  // @Delete()
  // async deleteUser(): Promise<void> {
  //   return this.userService.delete();
  // }
}
