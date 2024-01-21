import { LockKeyhole } from 'lucide-react';

export function Header({ label }: { label: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className="flex items-center gap-4 text-3xl font-semibold">
        <LockKeyhole className="h-10 w-10 text-sky-300" /> Auth
      </h1>
      <p>{label}</p>
    </div>
  );
}
