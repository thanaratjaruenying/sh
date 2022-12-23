import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common';
import { SignupDto, SigninDto, SignupWithLinkDto } from './dto';
import { MockAuthService } from '../../mock/services';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthController,
        {
          provide: AuthService,
          useFactory: MockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    test('should return a JWT token and set a cookie', async () => {
      const signupDto: SignupDto = {
        email: 'test@example.com',
        password: 'testpassword',
        firstName: 'testfirstName',
        lastName: 'testlastName',
        phone: 'testphone',
      };
      const jwt = 'testjwt';

      // Mock the signup method of the AuthService to return a fixed JWT token
      const signupSpy = jest
        .spyOn(authService, 'signup')
        .mockResolvedValue(jwt);

      // Mock the setHeader method of the response object to verify that it is called with the correct arguments
      const setHeaderSpy = jest.fn();
      const res = {
        header: setHeaderSpy,
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      await authController.signup(signupDto, res as any);

      // Verify that the signup method of the AuthService was called with the correct arguments
      expect(signupSpy).toHaveBeenCalledWith(signupDto);

      // Verify that the setHeader method of the response object was called with the correct arguments
      expect(setHeaderSpy).toHaveBeenCalledWith(
        'Set-Cookie',
        `jwt=${jwt}; HttpOnly; Path=/`,
      );

      // Verify that the status and send methods of the response object were called with the correct arguments
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(jwt);
    });
  });

  describe('signin', () => {
    test('should return a JWT token and set a cookie', async () => {
      const signinDto: SigninDto = {
        email: 'test@example.com',
        password: 'testpassword',
      };
      const jwt = 'testjwt';

      // Mock the signin method of the AuthService to return a fixed JWT token
      const signinSpy = jest
        .spyOn(authService, 'signin')
        .mockResolvedValue(jwt);

      const setHeaderSpy = jest.fn();
      const res = {
        header: setHeaderSpy,
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      await authController.signin(signinDto, res as any);

      // Verify that the signin method of the AuthService was called with the correct arguments
      expect(signinSpy).toHaveBeenCalledWith(signinDto);

      // Verify that the setHeader method of the response object was called with the correct arguments
      expect(setHeaderSpy).toHaveBeenCalledWith(
        'Set-Cookie',
        `jwt=${jwt}; HttpOnly; Path=/`,
      );

      // Verify that the status and send methods of the response object were called with the correct arguments
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(jwt);
    });
  });

  describe('signupWithLink', () => {
    test('should return the updated user', async () => {
      const signupWithLinkDto: SignupWithLinkDto = {
        email: 'test@example.com',
        password: 'testpassword',
        firstName: 'testfirstName',
        lastName: 'testlastName',
        phone: 'testphone',
      };
      const jwt = 'testjwt';

      // Mock the signupWithLink method of the AuthService to return a fixed user object
      const signupWithLinkSpy = jest
        .spyOn(authService, 'signupWithLink')
        .mockResolvedValue(jwt);

      // Mock the status and send methods of the response object to verify that they are called with the correct arguments
      const setHeaderSpy = jest.fn();
      const res = {
        header: setHeaderSpy,
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      await authController.signupWithLink(signupWithLinkDto, res as any);

      // Verify that the signupWithLink method of the AuthService was called with the correct arguments
      expect(signupWithLinkSpy).toHaveBeenCalledWith(signupWithLinkDto);

      // Verify that the setHeader method of the response object was called with the correct arguments
      expect(setHeaderSpy).toHaveBeenCalledWith(
        'Set-Cookie',
        `jwt=${jwt}; HttpOnly; Path=/`,
      );

      // Verify that the status and send methods of the response object were called with the correct arguments
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(jwt);
    });
  });
});
