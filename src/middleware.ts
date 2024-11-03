import { auth } from "@/auth";
import { NextResponse } from "next/server";
import ROUTES from "@/constants/routes";

const authRequiredPaths = [ROUTES.CREATE_POST, "/profile", "/post", "/tags"];

const nonAuthPaths = [ROUTES.SIGN_IN, ROUTES.SIGN_UP, ROUTES.VERIFY_EMAIL];

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const path = nextUrl.pathname;

  if (path.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (
    isLoggedIn &&
    nonAuthPaths.some((authPath) => path.startsWith(authPath))
  ) {
    return NextResponse.redirect(new URL(ROUTES.HOME, nextUrl));
  }

  if (
    !isLoggedIn &&
    authRequiredPaths.some((protectedPath) => path.startsWith(protectedPath))
  ) {
    const signInUrl = new URL(ROUTES.SIGN_IN, nextUrl);
    signInUrl.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/create-post",
    "/profile/:path*",
    "/post/:path*",
    "/tags/:path*",

    "/sign-in",
    "/sign-up",
    "/verify-email",

    "/api/auth/:path*",
  ],
};
