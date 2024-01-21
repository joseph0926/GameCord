import { auth, signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export async function LogoutButton() {
  const session = await auth();

  return (
    <div className="absolute bottom-16 left-3 w-24 md:w-52 lg:w-60">
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <Button variant="secondary" type="submit" className="w-[90%]">
          로그아웃
        </Button>
      </form>
    </div>
  );
}
