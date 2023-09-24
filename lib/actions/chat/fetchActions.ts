'use server';

import db from '@/lib/db';

export const fetchGroupMessage = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.groupMessage.findFirst({
      where: {
        AND: [{ memberOneId }, { memberTwoId }]
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
