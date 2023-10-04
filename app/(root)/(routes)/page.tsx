import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import Link from 'next/link';

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
          id: '4a80a75b-84b7-4f8a-a9fc-706b44d79bdf'
        },
        data: {
          members: {
            create: [{ profileId: profile.id }]
          }
        }
      });
    } catch (error) {
      console.log('[TEST_SERVER_ERROR]: ', error);
    }
  };

  await enterTestServer(profile?.id);

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">현재 Server 페이지 이외 페이지들은 개발중에 있습니다.</h1>
      <p className="text-xl">아래 테스트 서버로 접속하시거나 서버를 직접 생성해주세요.</p>
      <Link
        href={`/server/4a80a75b-84b7-4f8a-a9fc-706b44d79bdf/channel/0d040143-0906-4a1d-98d2-9579d5594c64`}
        className="bg-primary-500 px-4 py-2 text-white"
      >
        TestServer
      </Link>
    </div>
  );
};

export default MainPage;
