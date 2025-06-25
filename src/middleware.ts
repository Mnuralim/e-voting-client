import { NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(req: Request) {
  const { pathname } = new URL(req.url);

  const cookieHeader = req.headers.get("cookie");

  const token = cookieHeader
    ?.split("; ")
    .find((c) => c.startsWith("jwt="))
    ?.split("=")[1];

  if (pathname.startsWith("/admin")) {
    if (!token) {
      console.log("No token found, redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decode = decodeJwt(token) as { ctx?: { role?: string } };

      if (!decode || decode.ctx?.role !== "admin") {
        console.log("User is not an admin, redirecting to /unauthorized");
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch (error) {
      console.log(error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  console.log("Middleware passed, allowing request");

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
