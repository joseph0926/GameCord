/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');

async function resetDatabase() {
  const prisma = new PrismaClient();

  try {
    const collections = ['Account', 'Session', 'User', 'VerificationToken'];

    for (const collection of collections) {
      await prisma.$runCommandRaw({
        drop: collection,
      });
    }

    console.log('Database has been reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
