import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './common/jwt/jwt.strategy';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { ConfigModule } from './modules/config/config.module';
import { RepositoryModule } from './modules/repositories/repository.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    CompanyModule,
    ConfigModule,
    RepositoryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, JwtStrategy],
})
export class AppModule {}
