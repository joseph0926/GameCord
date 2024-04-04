import { cn } from '@/lib/utils';
import WritingForm from './components/writing-form';
import { auth } from '@/auth';

export default async function WritingPage() {
  const session = await auth();

  return (
    <div
      className={cn(
        'm-6 w-full rounded-[12px] border border-solid border-gray-600 p-4',
        session && session.user ? 'block' : 'hidden'
      )}
    >
      <WritingForm />
    </div>
  );
}
