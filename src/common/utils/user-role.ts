import { ForbiddenException } from '@nestjs/common';

import { Role, UserToken } from '../../interfaces';

export function checkUserCompanyPermission(user: UserToken, companyId: number) {
  const companyPermission = user.permissions.find(
    (permission) => permission.companyId === companyId,
  );
  if (companyPermission && companyPermission.role !== Role.ADMIN) {
    throw new ForbiddenException('no permission');
  }
}
