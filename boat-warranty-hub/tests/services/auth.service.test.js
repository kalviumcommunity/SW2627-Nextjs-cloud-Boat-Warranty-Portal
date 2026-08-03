import * as authService from '../../services/auth.service';
import * as userRepository from '../../repositories/user.repository';
import bcrypt from 'bcryptjs';

jest.mock('../../repositories/user.repository');
jest.mock('bcryptjs');

describe('Auth Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('registration', () => {
        test('throws error if user already exists', async () => {
            userRepository.findUserByEmail.mockResolvedValue({ id: 1 });
            await expect(authService.registration({ email: 'test@test.com' }))
                .rejects.toThrow("User already exists");
        });

        test('creates user and returns safe user', async () => {
            userRepository.findUserByEmail.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue('hashed_password');
            const createdUser = { id: 1, email: 'test@test.com', password: 'hashed_password', role: 'USER' };
            userRepository.createUser.mockResolvedValue(createdUser);

            const result = await authService.registration({
                email: 'test@test.com',
                password: 'password123',
                confirmPassword: 'password123'
            });

            expect(userRepository.createUser).toHaveBeenCalledWith({
                email: 'test@test.com',
                password: 'hashed_password',
                role: 'USER'
            });
            expect(result).not.toHaveProperty('password');
            expect(result.email).toBe('test@test.com');
        });
    });

    describe('loginUser', () => {
        test('throws error if user not found', async () => {
            userRepository.findUserByEmailOrPhone.mockResolvedValue(null);
            await expect(authService.loginUser({ email: 'test@test.com', password: 'password123' }))
                .rejects.toThrow("Invalid email or password");
        });

        test('throws error if password does not match', async () => {
            userRepository.findUserByEmailOrPhone.mockResolvedValue({ id: 1, password: 'hashed_password' });
            bcrypt.compare.mockResolvedValue(false);
            await expect(authService.loginUser({ email: 'test@test.com', password: 'wrongpassword' }))
                .rejects.toThrow("Invalid password or email");
        });

        test('returns safe user if login is successful', async () => {
            userRepository.findUserByEmailOrPhone.mockResolvedValue({ id: 1, email: 'test@test.com', password: 'hashed_password' });
            bcrypt.compare.mockResolvedValue(true);
            
            const result = await authService.loginUser({ email: 'test@test.com', password: 'password123' });
            
            expect(result).not.toHaveProperty('password');
            expect(result.email).toBe('test@test.com');
        });
    });
});
