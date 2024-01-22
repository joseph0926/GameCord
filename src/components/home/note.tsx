'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createNote } from '@/actions/note';
import { toast } from 'sonner';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function Note() {
  const router = useRouter();
  const user = useCurrentUser();

  const onCreate = () => {
    const promise = createNote({ title: 'Untitled' }).then((noteId) =>
      router.push(`/notes/${noteId}`),
    );

    toast.promise(promise, {
      loading: '새로운 노트 생성중,,,',
      success: '노트 생성 완료!',
      error: '노트 생성에 실패하였습니다.',
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.name}&apos;s Note
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  );
}
