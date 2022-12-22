export const MockAuthService = jest.fn(() => ({
  signup: jest.fn(),
  signin: jest.fn(),
  signupWithLink: jest.fn(),
}));
