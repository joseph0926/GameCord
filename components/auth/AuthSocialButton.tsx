import Image from 'next/image';

type AuthSocialButtonProps = {
  image: string;
  onClick: () => void;
};

const AuthSocialButton = ({ image, onClick }: AuthSocialButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md px-4 py-3 shadow-sm ring-1 ring-inset ring-zinc-300 focus:outline-offset-0"
    >
      <Image src={image} alt="social" width={100} height={100} className="h-[20px] w-[80px]" />
    </button>
  );
};

export default AuthSocialButton;
