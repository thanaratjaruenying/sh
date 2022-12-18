import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { SystemRole, User } from 'src/interfaces';
import { ConfigService } from '../config/config.service';
import { UserRepository } from '../repositories';
import { SigninInterface, SignupInterface } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private gethash(): crypto.Hash {
    return crypto.createHash('sha256');
  }

  private verifyPassword(
    password: string,
    hashedPassword: string,
    salt: string,
  ) {
    // Hash the password, the salt, and the secret key together
    const hash = this.gethash();
    hash.update(password + salt + this.config.env.SECRET_KEY);
    const computedHashedPassword = hash.digest('hex');

    // Compare the computed hashed password to the stored hashed password
    return computedHashedPassword === hashedPassword;
  }

  // Only Salary Hero email can have SH role
  isShEmail(email: string): boolean {
    return this.config.env.SH_EMAILS.includes(email);
  }

  async signup(data: SignupInterface): Promise<User> {
    const { password, email } = data;

    // Generate a random salt
    const salt = crypto.randomBytes(32).toString('hex');

    // Hash the password and the salt together
    const hash = this.gethash();
    hash.update(password + salt);
    const hashedPassword = hash.digest('hex');

    return this.usersRepo.create({
      ...data,
      salt,
      hash: hashedPassword,
      systemRole: this.isShEmail(email) ? SystemRole.SH : SystemRole.USER,
    });
  }

  async signin(data: SigninInterface): Promise<string> {
    const { email, password } = data;

    const user = await this.usersRepo.getByEmail(email);
    if (!user) {
      throw new BadRequestException('email not found');
    }

    const result = this.verifyPassword(password, user.hash, user.salt);
    if (!result) {
      throw new UnauthorizedException();
    }

    const exp = Math.floor(Date.now() / 1000) + 86400;
    const payload = {
      exp,
      email: user.email,
      systemRole: user.systemRole,
    };
    const jwt = this.jwtService.sign(payload, {
      secret: this.config.env.SECRET_KEY,
    });

    return jwt;
  }
}