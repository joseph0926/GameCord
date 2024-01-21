import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { CardWrapper } from '@/components/ui/card-wrapper';

export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="인증 과정에서 알수없는 에러가 발생했습니다."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
      </div>
    </CardWrapper>
  );
}
