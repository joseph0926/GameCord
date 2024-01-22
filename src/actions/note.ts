'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/query/current-user';
import { getUserById } from '@/query/get-user';
import { Note } from '@prisma/client';

type CreateNoteProps = {
  title: string;
};

type UpdateNoteProps = {
  noteId: string;
  title?: string;
  content?: string;
  coverImage?: string;
  icon?: string;
  isPublished?: boolean;
};

export const createNote = async ({
  title,
}: CreateNoteProps): Promise<{ message: string; data: null | Note }> => {
  const user = await currentUser();
  if (!user || user.id === undefined) {
    return {
      message: '인증 오류',
      data: null,
    };
  }

  const note = await db.note.create({
    data: {
      userId: user.id,
      title,
      isArchived: false,
      isPublished: false,
    },
  });

  return {
    message: 'Note 생성에 성공하였습니다.',
    data: note,
  };
};

export const updateNote = async ({
  noteId,
  content,
  title,
  coverImage,
  icon,
  isPublished,
}: UpdateNoteProps) => {
  const user = await currentUser();
  if (!user || user.id === undefined) {
    return {
      message: '인증 오류',
      data: null,
    };
  }

  const existingNote = await db.note.findUnique({
    where: {
      id: noteId,
    },
  });
  if (!existingNote) {
    return {
      message: '해당 Note를 찾지 못하였습니다.',
      data: null,
    };
  }
  if (existingNote.userId !== user.id) {
    return {
      message: '인증 오류',
      data: null,
    };
  }

  const note = await db.note.update({
    where: {
      id: existingNote.id,
    },
    data: {
      title,
      content,
      coverImage,
      icon,
      isPublished,
    },
  });

  return {
    message: 'Note를 업데이트하였습니다.',
    data: note,
  };
};

export const removeIcon = async ({ noteId }: { noteId: string }) => {
  const user = await currentUser();
  if (!user || user.id === undefined) {
    return {
      message: '인증 오류',
      data: null,
    };
  }

  const existingNote = await db.note.findUnique({
    where: {
      id: noteId,
    },
  });
  if (!existingNote) {
    return {
      message: '해당 Note를 찾지 못하였습니다.',
      data: null,
    };
  }
  if (existingNote.userId !== user.id) {
    return {
      message: '인증 오류',
      data: null,
    };
  }

  const note = await db.note.update({
    where: {
      id: noteId,
    },
    data: {
      icon: undefined,
    },
  });

  return {
    message: 'Icon을 삭제하였습니다.',
    data: note,
  };
};

export const removeCoverImage = async ({ noteId }: { noteId: string }) => {
  const user = await currentUser();
  if (!user || user.id === undefined) {
    return {
      message: '인증 오류',
      data: null,
    };
  }

  const existingNote = await db.note.findUnique({
    where: {
      id: noteId,
    },
  });
  if (!existingNote) {
    return {
      message: '해당 Note를 찾지 못하였습니다.',
      data: null,
    };
  }
  if (existingNote.userId !== user.id) {
    return {
      message: '인증 오류',
      data: null,
    };
  }

  const note = await db.note.update({
    where: {
      id: noteId,
    },
    data: {
      coverImage: undefined,
    },
  });

  return {
    message: 'CoverImage를 삭제하였습니다.',
    data: note,
  };
};

export const getNotes = async () => {
  const user = await currentUser();
  if (!user || user.id === undefined) {
    return {
      message: '인증 오류',
      data: null,
    };
  }

  const notes = await db.note.findMany({
    where: {
      userId: user.id,
    },
  });

  return {
    message: 'Note를 불러왔습니다.',
    data: notes,
  };
};
