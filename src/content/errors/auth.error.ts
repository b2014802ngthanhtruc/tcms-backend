export const AUTH_ERROR = {
  INVALID_TOKEN: {
    code: 'AUTH_01',
    message: 'Token is invalid or expired',
  },
  VERIFY_CODE_FAILED: {
    code: 'AUTH_02',
    message: 'Code is invalid or expired',
  },
  NOT_VERIFIED: {
    code: 'AUTH_03',
    message: 'Email is not verified',
  },
  LOGIN_FAILED: {
    code: 'AUTH_04',
    message: 'Password or email is incorrect',
  },
  PASSWORD_INCORRECT: {
    code: 'AUTH_05',
    message: 'Password is incorrect',
  },
  FORBIDDEN_RESOURCE: {
    code: 'AUTH_06',
    message: 'Forbidden resource',
  },
};
