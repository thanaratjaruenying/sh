import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { SignupDto, SigninDto, SignupWithLinkDto } from './dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signup: SignupDto, @Res() res: FastifyReply<any>) {
    const result = await this.authService.signup(signup);

    res.header('Set-Cookie', `jwt=${result}; HttpOnly; Path=/`);

    res.status(HttpStatus.OK).send(result);
  }

  @Post('signin')
  async signin(@Body() signin: SigninDto, @Res() res: FastifyReply<any>) {
    const result = await this.authService.signin(signin);

    // Store the JWT in a cookie
    res.header('Set-Cookie', `jwt=${result}; HttpOnly; Path=/`);

    res.status(HttpStatus.OK).send(result);
  }

  @Post('signup/:email')
  async signupWithLink(
    @Body() signup: SignupWithLinkDto,
    @Res() res: FastifyReply<any>,
  ) {
    const result = await this.authService.signupWithLink(signup);

    res.status(HttpStatus.OK).send(result);
  }
}
