import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

type BoxProps = ComponentProps<'div'>;

/** 재사용 가능한 Box 레이아웃 컴포넌트
 * @param props div props
 */
export function Box({ className, children, ...props }: BoxProps) {
  return (
    <div {...props} className={cn('rounded-2xl bg-background p-6', className)}>
      {children}
    </div>
  );
}
