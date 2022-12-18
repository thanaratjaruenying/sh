import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { RepositoryModule } from './modules/repositories/repository.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule, UserModule, RepositoryModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
