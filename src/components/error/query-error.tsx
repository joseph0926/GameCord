'use client';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from './error-boundary';

export function QueryErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      fallback={
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <p>데이터를 불러오는 중 문제가 발생했습니다.</p>
          <button
            onClick={() => reset()}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
