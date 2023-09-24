'use client';

import { Plus } from 'lucide-react';
import ActionTooltip from '../ui/action-tooltip';
import { useModalStore } from '@/hooks/useModalStore';

const NavigationAction = () => {
  const { onOpen } = useModalStore();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="새로운 서버 생성">
        <button className="group flex items-center" onClick={() => onOpen('createServer')}>
          <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-background transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700">
            <Plus size={25} className="h-4 w-4 text-emerald-500 transition-all group-hover:text-white" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
