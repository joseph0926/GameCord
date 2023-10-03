import { getCurrentUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const MainPage = async () => {
  const profile = await getCurrentUser();
  const enterTestServer = async (profileId: string) => {
    try {
      if (!profileId) {
        return null;
      }

      const existingMember = await db.server.findFirst({
        where: {
          members: {
            some: {
              profileId
            }
          }
        }
      });
      if (existingMember) {
        return null;
      }

      await db.server.update({
        where: {
          id: 'f8c9a28f-4e07-4257-bdd2-08d15f5cc5ea'
        },
        data: {
          members: {
            create: [{ profileId }]
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  await enterTestServer(profile?.id);

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">현재 Server 페이지 이외 페이지들은 개발중에 있습니다.</h1>
      <p className="text-xl">아래 테스트 서버로 접속하시거나 서버를 직접 생성해주세요.</p>
      <Link href={`/server/f8c9a28f-4e07-4257-bdd2-08d15f5cc5ea`} className="bg-primary-500 px-4 py-2 text-white">
        TestServer
      </Link>
    </div>
  );
};

export default MainPage;
