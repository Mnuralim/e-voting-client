import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export async function middleware(req: Request) {
  const { pathname } = new URL(req.url);
  // const cookieStore = cookies();
  // const token = (await cookieStore).get("jwt")?.value;

  const cookieHeader = req.headers.get("cookie");
  console.log("Cookies from header:", cookieHeader);

  const token = cookieHeader
    ?.split("; ")
    .find((c) => c.startsWith("jwt="))
    ?.split("=")[1];

  console.log("Token:", token);

  if (pathname.startsWith("/admin")) {
    if (!token) {
      console.log("No token found, redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decode = decodeJwt(token) as { ctx?: { role?: string } };
      console.log("Decoded Token:", decode);

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
