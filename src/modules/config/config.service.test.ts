import { Test, TestingModule } from '@nestjs/testing';
import { ValidationError } from 'class-validator';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let configService: ConfigService;

  async function createTestModule(
    validate: boolean,
    skipValidation = false,
  ): Promise<void> {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService({
            envFile: '__TEST_ENV_FILE__',
            validate,
            validatorOptions: { skipMissingProperties: skipValidation },
          }),
        },
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  }

  describe('new ConfigService()', () => {
    test('should fail the validation if environments are not there', async () => {
      try {
        await createTestModule(false);
      } catch (errors) {
        expect(Array.isArray(errors)).toBeTruthy();
        expect(errors[0]).toBeInstanceOf(ValidationError);
      }
    });

    test('should validate environment variables with skip missing variable options', async () => {
      process.env.PORT = '3000';
      process.env.REDIS_PORT = '6379';
      const expectedPort = 3000;

      await createTestModule(true, true);
      const actualPort: number = configService.env.PORT;
      expect(actualPort).toEqual(expectedPort);
      expect(typeof actualPort).toBe('number');
    });

    test('should get environment from process.env', async () => {
      try {
        process.env.PORT = '3000';

        await createTestModule(true, false);
      } catch (errors) {
        expect(Array.isArray(errors)).toBeTruthy();
        expect(errors[0]).toBeInstanceOf(ValidationError);
      }
    });
  });
});
