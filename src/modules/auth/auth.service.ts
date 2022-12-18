import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { User } from 'src/interfaces';
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

  async signup(data: SignupInterface): Promise<User> {
    const { password } = data;

    // Generate a random salt
    const salt = crypto.randomBytes(32).toString('hex');

    // Hash the password and the salt together
    const hash = this.gethash();
    hash.update(password + salt + this.config.env.SECRET_KEY);
    const hashedPassword = hash.digest('hex');

    return this.usersRepo.create({ ...data, salt, hash: hashedPassword });
  }

  async signin(data: SigninInterface): Promise<any> {
    const { email, password } = data;

    const user = await this.usersRepo.getByEmail(email);
    if (!user) {
      throw new BadRequestException('email not found');
    }

    const result = this.verifyPassword(password, user.hash, user.salt);
    if (!result) {
      throw new BadRequestException('wrong email or password');
    }

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      email: user.email,
      systemRole: user.systemRole,
      exp: now + 86400,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.config.env.SECRET_KEY,
    });

    return token;
  }
}
