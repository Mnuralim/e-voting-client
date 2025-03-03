import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function middleware(req: Request) {
  const { pathname } = new URL(req.url);
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const decode = jwt.decode(token) as { ctx: { role: string } };
    if (!decode) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (decode.ctx.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
