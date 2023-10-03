'use client';

import { Home, Plus } from 'lucide-react';
import ActionTooltip from '../ui/action-tooltip';
import { useModal } from '@/hooks/useModal';
import { useRouter } from 'next/navigation';

const NavigationAction = () => {
  const { onOpen } = useModal();
  const router = useRouter();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Home">
        <button className="group mb-4 flex items-center" onClick={() => router.push('/')}>
          <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-neutral-200 transition-all group-hover:rounded-[16px] group-hover:bg-primary-500 dark:bg-neutral-700">
            <Home size={25} className="h-4 w-4 text-primary-500 transition-all group-hover:text-white" />
          </div>
        </button>
      </ActionTooltip>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button className="group flex items-center" onClick={() => onOpen('createServer')}>
          <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-neutral-200 transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700">
            <Plus size={25} className="h-4 w-4 text-emerald-500 transition-all group-hover:text-white" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
