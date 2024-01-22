import { db } from '@/lib/db';
import { currentUser } from '@/query/current-user';
import { NextApiRequest, NextApiResponse } from 'next';

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { content, title, coverImage, icon, isPublished, noteId } = req.body;

  const user = await currentUser();
  if (!user || user.id === undefined) {
    return res.status(401).json({ message: '인증 오류' });
  }

  const existingNote = await db.note.findUnique({
    where: { id: noteId },
  });
  if (!existingNote) {
    return res.status(404).json({ message: '해당 Note를 찾지 못하였습니다.' });
  }
  if (existingNote.userId !== user.id) {
    return res.status(403).json({ message: '인증 오류' });
  }

  const updatedNote = await db.note.update({
    where: { id: existingNote.id },
    data: { title, content, coverImage, icon, isPublished },
  });

  return res
    .status(200)
    .json({ message: 'Note를 업데이트하였습니다.', data: updatedNote });
}
