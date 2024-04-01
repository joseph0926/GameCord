import { GithubLogoIcon, GoogleLogoIcon } from '@/constants/custom-icon';

export function SocialLogin() {
  return (
    <div className="flex w-full flex-col gap-4">
      <button
        type="button"
        className="mt-10 flex w-full items-center rounded-lg border border-gray-200 px-4 py-3.5 transition-all duration-200 hover:border-gray-500 hover:bg-gray-500/25 focus:outline-none"
      >
        <GoogleLogoIcon />
        <p className="ml-4 text-base font-medium text-gray-100">
          Continue with Google
        </p>
      </button>
      <button
        type="button"
        className="flex w-full items-center rounded-lg border border-gray-200 px-4 py-3.5 transition-all duration-200 hover:border-gray-500 hover:bg-gray-500/25 focus:outline-none"
      >
        <GithubLogoIcon color="fill-gray-100" />
        <p className="ml-4 text-base font-medium text-gray-100">
          Continue with Github
        </p>
      </button>
    </div>
  );
}
