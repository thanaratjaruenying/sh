import { Global, Module } from '@nestjs/common'
import { ConfigService } from './config.service'

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService({
        envFile: 'local.env',
        validate: true,
        validatorOptions: { skipMissingProperties: false },
      }),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
