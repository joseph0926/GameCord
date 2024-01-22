'use client';

import Image from 'next/image';
import { ImageIcon, X } from 'lucide-react';
import { useParams } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCoverImage } from '@/hooks/useCoverImage';
import { useEdgeStore } from '@/hooks/useEdgeStore';
import { removeCoverImage } from '@/actions/note';

interface CoverImageProps {
  url?: string | null;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const params: { noteId: string } = useParams();
  const coverImage = useCoverImage();

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({
      noteId: params.noteId,
    });
  };

  return (
    <div
      className={cn(
        'group relative h-[35vh] w-full',
        !url && 'h-[12vh]',
        url && 'bg-muted',
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="h-[12vh] w-full" />;
};
