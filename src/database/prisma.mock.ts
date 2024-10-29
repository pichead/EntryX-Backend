import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from './prisma';

export type MockPrismaService = DeepMockProxy<PrismaService>;

export const createMockPrismaService = (): MockPrismaService => {
    return mockDeep<PrismaService>();
};