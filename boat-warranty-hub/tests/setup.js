import '@testing-library/jest-dom';

// Global test setup
// Mock Prisma
jest.mock('@/lib/prisma', () => require('./__mocks__/prisma'));

// Mock Auth
jest.mock('@/lib/auth', () => require('./__mocks__/auth'));

// Mock Storage
jest.mock('@/lib/storage', () => require('./__mocks__/storage'));

// Mock Logger
jest.mock('@/lib/logger', () => require('./__mocks__/logger'));

// Mock Next.js Navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        replace: jest.fn(),
    }),
    useParams: () => ({ id: '1' }),
    useSearchParams: () => new URLSearchParams(),
    usePathname: () => '/',
}));

// Mock next/router
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        back: jest.fn(),
    }),
}));

// Mock NextAuth
jest.mock('next-auth/react', () => ({
    useSession: () => ({
        data: { user: { email: 'admin@boat.com', name: 'Admin' } },
        status: 'authenticated',
    }),
    signOut: jest.fn(),
}));

// Clear all mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});
