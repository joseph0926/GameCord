import { db } from '@/lib/db';
import { currentUser } from '@/query/current-user';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const { content, title, coverImage, icon, isPublished, noteId } =
    await req.json();

  const user = await currentUser();
  if (!user || user.id === undefined) {
    return NextResponse.json({ message: '인증 오류' });
  }

  const existingNote = await db.note.findUnique({
    where: { id: noteId },
  });
  if (!existingNote) {
    return NextResponse.json({ message: '해당 Note를 찾지 못하였습니다.' });
  }
  if (existingNote.userId !== user.id) {
    return NextResponse.json({ message: '인증 오류' });
  }

  const updatedNote = await db.note.update({
    where: { id: existingNote.id },
    data: { title, content, coverImage, icon, isPublished },
  });

  return NextResponse.json({
    message: 'Note를 업데이트하였습니다.',
    data: updatedNote,
  });
}
