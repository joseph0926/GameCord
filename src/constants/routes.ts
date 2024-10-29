const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  CREATE_POST: "/create-post",
  PROFILE: (id: string) => `/profile/${id}`,
  POST: (id: string) => `/post/${id}`,
  TAGS: (id: string) => `/tags/${id}`,
};

export default ROUTES;
