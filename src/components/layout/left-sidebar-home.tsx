import { ChevronRight } from 'lucide-react';

export default function LeftSidebarHome() {
  return (
    <div className="flex w-full flex-col gap-4 border-b border-solid border-gray-600 pb-4">
      <h2 className="font-semibold">Home</h2>
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <span className="cursor-pointer text-sm text-gray-400">
            일간/주간/월간 인기글
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-700 text-[0.75rem]">
            9+
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="cursor-pointer text-sm text-gray-400">
            공지/이벤트
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-700 text-[0.75rem]">
            9+
          </span>
        </div>
        <div className="mt-1 flex w-full cursor-pointer items-center justify-between">
          <span className="text-sm text-gray-400">채팅 서버로 이동하기</span>
          <ChevronRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
