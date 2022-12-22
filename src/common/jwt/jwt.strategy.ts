import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: FastifyRequest) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['jwt'];
        }

        return token;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  // return data from token
  async validate(payload: any) {
    return {
      email: payload.email,
      roles: [payload.systemRole],
      permissions: payload.permissions,
    };
  }
}
