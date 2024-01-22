import { Cover } from '@/components/note/cover';
import Note from '@/components/note/note';
import { Skeleton } from '@/components/ui/skeleton';
import { getNoteById } from '@/query/get-note';
import { Note as NoteType } from '@prisma/client';

export default async function NotePage({
  params,
}: {
  params: { noteId: string };
}) {
  const note = (await getNoteById({ noteId: params.noteId })) as NoteType;

  if (note == null) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  return <Note noteId={note.id} note={note} />;
}
