import { ForbiddenException } from '@nestjs/common';

import { Role, UserToken } from '../../interfaces';

export function checkUserCompanyPermission(user: UserToken, companyId: number) {
  const companyPermission = user.permissions[companyId.toString()];

  if (companyPermission !== Role.ADMIN) {
    throw new ForbiddenException('no permission');
  }
}
