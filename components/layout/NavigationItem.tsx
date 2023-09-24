'use client';

import { useParams, useRouter } from 'next/navigation';
import ActionTooltip from '@/components/ui/action-tooltip';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type NavigationItemProps = {
  id: string;
  imageUrl: string;
  name: string;
};

const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        onClick={() => {
          router.push(`/server/${id}`);
        }}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            'absolute left-0 w-[4px] rounded-r-full bg-primary transition-all',
            params?.serverId !== id ? 'h-[8px] group-hover:h-[20px]' : 'h-[36px]'
          )}
        />
        <div
          className={cn(
            'group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]',
            params?.serverId === id && 'rounded-[16px] bg-primary/10 text-primary'
          )}
        >
          <Image src={imageUrl} width={48} height={48} className="h-full w-full" alt="channel" />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
