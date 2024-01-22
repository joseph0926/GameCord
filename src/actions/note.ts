'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/query/current-user';
import { getUserByEmail } from '@/query/get-user';

type CreateNoteProps = {
  title: string;
};

export const createNote = async ({ title }: CreateNoteProps) => {
  const user = await currentUser();
  if (!user || user.id === undefined) {
    return null;
  }

  const note = await db.note.create({
    data: {
      userId: user.id,
      title,
      isArchived: false,
      isPublished: false,
    },
  });

  return note;
};
