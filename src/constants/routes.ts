export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  ASK_QUESTION: '/ask-post',
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/post/${id}`,
  TAGS: (id: string) => `/tags/${id}`,
};
