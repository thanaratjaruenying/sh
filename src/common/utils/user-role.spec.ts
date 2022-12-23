import { checkUserCompanyPermission } from './user-role';

describe('common/utils', () => {
  test('should not throw if Admin', () => {
    const user = {
      email: 'testemail',
      roles: ['testrole'],
      permissions: {
        '1': 'ADMIN',
      },
    };

    const actual = checkUserCompanyPermission(user, 1);

    expect(actual).toBeUndefined();
  });

  test('should throw if not Admin', () => {
    const user = {
      email: 'testemail',
      roles: ['testrole'],
      permissions: {
        '1': 'EMPLOYEE',
      },
    };

    expect(() => checkUserCompanyPermission(user, 1)).toThrow('no permission');
  });
});
