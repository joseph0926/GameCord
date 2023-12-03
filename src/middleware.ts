import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/api/uploadthing', '/api/webhook', '/post', '/post/:postId', '/game/:gameId', '/search'],
  ignoredRoutes: ['/post/:postId', '/game/:gameId', '/search']
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
