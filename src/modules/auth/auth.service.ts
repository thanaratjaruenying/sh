import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { SystemRole, UserPermission } from '../../interfaces';
import { ConfigService } from '../config/config.service';
import { UserPermissionRepository, UserRepository } from '../repositories';
import {
  SigninInterface,
  SignupInterface,
  SignupWithLinkInterface,
} from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userPermissionRepo: UserPermissionRepository,
  ) {}

  private async getCompanyPermissions(
    userId: number,
  ): Promise<ReadonlyArray<Partial<UserPermission>>> {
    const permissions = await this.userPermissionRepo.getByUserId(userId);

    return permissions.map((permission) => ({
      role: permission.role,
      companyId: permission.companyId,
    }));
  }

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
    hash.update(password + salt);
    const computedHashedPassword = hash.digest('hex');

    // Compare the computed hashed password to the stored hashed password
    return computedHashedPassword === hashedPassword;
  }

  // Only Salary Hero email can have SH role
  private isShEmail(email: string): boolean {
    return this.config.env.SH_EMAILS.includes(email);
  }

  private async getJwtToken(
    id: number,
    email: string,
    systemRole: SystemRole,
  ): Promise<string> {
    const exp = Math.floor(Date.now() / 1000) + 86400;
    const permissions = await this.getCompanyPermissions(id);
    const payload = {
      exp,
      permissions,
      systemRole,
      email: email,
    };
    const jwt = this.jwtService.sign(payload, {
      secret: this.config.env.SECRET_KEY,
    });

    return jwt;
  }

  private getHashSalt(password: string): { hash: string; salt: string } {
    // Generate a random salt
    const salt = crypto.randomBytes(32).toString('hex');

    // Hash the password and the salt together
    const hash = this.gethash();
    hash.update(password + salt);
    const hashedPassword = hash.digest('hex');
    return { salt, hash: hashedPassword };
  }

  async signup(data: SignupInterface): Promise<string> {
    const { password, email } = data;
    const found = await this.usersRepo.getByEmail(email);
    if (found) {
      throw new BadRequestException('email is already signed up');
    }

    const { hash, salt } = this.getHashSalt(password);

    const user = await this.usersRepo.create({
      ...data,
      salt,
      hash,
      systemRole: this.isShEmail(email) ? SystemRole.SH : SystemRole.USER,
    });

    return this.getJwtToken(user.id, user.email, user.systemRole);
  }

  async signin(data: SigninInterface): Promise<string> {
    const { email, password } = data;

    const user = await this.usersRepo.getByEmail(email);
    if (!user) {
      throw new BadRequestException('email not found');
    }
    if (!user.active) {
      throw new BadRequestException('user is deactive');
    }

    const result = this.verifyPassword(password, user.hash, user.salt);
    if (!result) {
      throw new UnauthorizedException();
    }

    return this.getJwtToken(user.id, user.email, user.systemRole);
  }

  async signupWithLink(data: SignupWithLinkInterface): Promise<string> {
    const { password, email, firstName, lastName, phone } = data;

    const user = await this.usersRepo.getByEmail(email);
    if (!user) {
      throw new BadRequestException('email not found');
    }
    // Employee will has their email in the DB without password
    // They have to sign up with link(email)
    // should be better if using Redis key with expire
    if (!user.salt || !user.hash) {
      throw new ForbiddenException();
    }

    const { hash, salt } = this.getHashSalt(password);

    await this.usersRepo.updateUser({
      ...user,
      firstName,
      lastName,
      phone,
      hash,
      salt,
    });

    return this.getJwtToken(user.id, user.email, user.systemRole);
  }
}
