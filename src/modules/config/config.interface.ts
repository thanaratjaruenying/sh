import { ValidatorOptions } from 'class-validator';

export interface ConfigOptions {
  readonly envFile: string;
  readonly validate?: boolean;
  readonly validatorOptions?: ValidatorOptions;
}
