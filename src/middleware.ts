import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export async function middleware(req: Request) {
  const { pathname } = new URL(req.url);
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decode = decodeJwt(token) as { ctx?: { role?: string } };
      if (!decode || decode.ctx?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch (error) {
      console.log(error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
