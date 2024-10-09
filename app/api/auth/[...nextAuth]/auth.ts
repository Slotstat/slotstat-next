import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations";
import { baseUrl } from "@/lib/baseURL";
import { cookies } from "next/headers";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userIdentifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const validatedCredentials = loginSchema.parse(credentials);

          const res = await fetch(`${baseUrl}/api/user/authorization`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validatedCredentials),
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error("Authorization failed:", errorData);
            throw new Error(errorData.ErrorMessage || "Failed to authorize");
          }

          const user = await res.json();
          console.log("Authorization successful:", user);

          return {
            id: user.userData.id,
            name: user.userData.userName,
            email: user.userData.email,
            image: user.userData.image,
            emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
            access_Token: user.access_Token,
            refresh_Token: user.refresh_Token,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.accessToken = user.access_Token;
        token.refreshToken = user.refresh_Token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        emailVerified: token.emailVerified as Date | null,
        access_Token: token.accessToken as string,
        refresh_Token: token.refreshToken as string,
        image: token.image as string,
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  trustHost: true,
  // debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
