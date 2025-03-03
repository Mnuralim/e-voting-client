import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      role?: "USER" | "ADMIN";
    };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id: string;
    nim?: string;
    role?: string;
    exp?: number;
  }
}

declare module "next-auth" {
  interface User {
    accessToken?: string;
    id: string;
    nim?: string;
    role?: string;
  }
}
