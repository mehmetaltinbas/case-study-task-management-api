import dotenv from 'dotenv';
import { prisma } from '../prisma/prisma-client';

dotenv.config({ path: '.test.env' });

beforeEach(async () => {
    console.log('cleaning test database...');
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
    console.log('test database cleaned!\n');
});

afterAll(async () => {
    await prisma.$disconnect();
});
