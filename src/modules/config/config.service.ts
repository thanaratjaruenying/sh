import { plainToClass } from 'class-transformer';
import {
  validateSync,
  ValidationError,
  ValidatorOptions,
} from 'class-validator';
import { config } from 'dotenv';
import { join } from 'path';

import { EnvironmentConfigDto } from './config.dto';
import { ConfigOptions } from './config.interface';

export class ConfigService {
  public readonly env: EnvironmentConfigDto;

  constructor(
    options: ConfigOptions = {
      envFile: 'local.env',
      validate: false,
      validatorOptions: undefined,
    },
  ) {
    config({
      path: join(process.cwd(), options.envFile),
    });

    this.env = this.convert(process.env);
    if (options.validate) {
      this.validate(this.env, options.validatorOptions);
    }
  }

  private convert(processEnvObject: object): EnvironmentConfigDto {
    return plainToClass(EnvironmentConfigDto, processEnvObject, {
      excludeExtraneousValues: true,
    });
  }

  private validate(
    envConfig: EnvironmentConfigDto,
    validatorOptions: ValidatorOptions = {},
  ): void {
    const errors: ReadonlyArray<ValidationError> = validateSync(
      envConfig,
      validatorOptions,
    );
    if (errors.length) {
      throw errors;
    }
  }
}
