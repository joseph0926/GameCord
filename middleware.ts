import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/'
  }
});

export const config = {
  matcher: ['/setup/:path*', '/server/:path*', '/invite/:path*']
};
