import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: Date | null;
    access_Token: string;
    refresh_Token: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: Date | null;
      image: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image: string;
    accessToken: string;
    refreshToken: string;
  }
}
