import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config/config.module';
import { RepositoryModule } from './modules/repositories/repository.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule, UserModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
