export type SignInWithOAuthParams = {
  provider: 'github' | 'google';
  providerAccountId: string;
  user: {
    email: string;
    name: string;
    image: string;
    username: string;
  };
};

export type AuthCredentials = {
  name: string;
  username: string;
  email: string;
  password: string;
};
