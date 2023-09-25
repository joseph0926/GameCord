'use server';

import db from '@/lib/db';

export const createGroupMessage = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.groupMessage.create({
      data: {
        memberOneId,
        memberTwoId
      },
      include: {
        memberOne: {
          include: {
            user: true
          }
        },
        memberTwo: {
          include: {
            user: true
          }
        }
      }
    });
  } catch (error) {
    return null;
  }
};
