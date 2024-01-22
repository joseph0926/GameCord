'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { Cover } from '@/components/note/cover';
import { Toolbar } from '@/components/note/toolbar';
import { updateNote } from '@/actions/note';
import { Note } from '@prisma/client';

interface NoteProps {
  noteId: string;
  note: Note;
}

const Note = ({ noteId, note }: NoteProps) => {
  const Editor = useMemo(
    () => dynamic(() => import('@/components/note/editor'), { ssr: false }),
    [],
  );

  const onChange = (content: string) => {
    updateNote({
      noteId: noteId,
      content,
    });
  };

  if (note.coverImage === undefined || note.content === undefined) {
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

  return (
    <div className="pb-40">
      <Cover url={note.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={note} preview={false} />
        <Editor onChange={onChange} initialContent={note.content} />
      </div>
    </div>
  );
};

export default Note;
