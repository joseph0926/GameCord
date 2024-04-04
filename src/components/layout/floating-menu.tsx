import { PenSquare } from 'lucide-react';
import Link from 'next/link';

export function FloatingMenu() {
  return (
    <Link
      href="/writing"
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-400"
    >
      <PenSquare className="h-6 w-6 text-gray-200" />
    </Link>
  );
}
