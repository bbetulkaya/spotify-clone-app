import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname, origin } = req.nextUrl;

    if (pathname.includes("/api/auth") || token) {
      return NextResponse.next();
    }

    if (!token && !pathname.includes("/login")) {
      return NextResponse.redirect(`${origin}/login`);
    }
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return NextResponse.error();
  }
}


export const config = {
  matcher: [
    '/((?!_next|api/auth).*)(.+)'
  ],
}