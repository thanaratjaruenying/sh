import { SetMetadata } from '@nestjs/common';

import { SystemRole } from 'src/interfaces';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ReadonlyArray<SystemRole>) =>
  SetMetadata(ROLES_KEY, roles);
