import { db } from '@/lib/db';
import { currentUser } from './current-user';

export const getNoteById = async ({ noteId }: { noteId: string }) => {
  const user = await currentUser();

  const note = await db.note.findUnique({
    where: {
      id: noteId,
    },
  });
  if (!note) {
    return {
      message: '해당하는 Note를 찾을 수 없습니다.',
      data: null,
    };
  }

  if (note.isPublished && !note.isArchived) {
    return note;
  }

  if (!user || user.id === undefined) {
    return {
      message: '인증 오류',
      data: null,
    };
  }

  if (note.userId !== user.id) {
    return {
      message: '인증 오류',
      data: null,
    };
  }

  return note;
};
