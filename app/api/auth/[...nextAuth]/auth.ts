import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations";
import { baseUrl } from "@/lib/baseURL";

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

        const validatedCredentials = loginSchema.parse(credentials);

        const res = await fetch(`${baseUrl}/api/user/authorization`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedCredentials),
        });
        if (!res.ok) {
          const { ErrorMessage } = await res.json();
          throw new Error(ErrorMessage);
        }
        const user = await res.json();
        console.log("first", user);

        return {
          id: user.userData.id,
          name: user.userData.userName,
          email: user.userData.email,
          image: user.userData.image,
          emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
          access_Token: user.access_Token,
          refresh_Token: user.refresh_Token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT Callback - Token:", token, "User:", user);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.emailVerified = user.emailVerified;
        token.accessToken = user.access_Token;
        token.refreshToken = user.refresh_Token;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      // console.log("Session Callback - Session:", session, "Token:", token);
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        emailVerified: new Date(), // Assuming email is verified for simplicity
        image: token.image as string,
        access_Token: token.accessToken as string,
        refresh_Token: token.refreshToken as string,
      };
      session.accessToken = token.accessToken as string; // Type assertion
      session.refreshToken = token.refreshToken as string; // Type assertion
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  // debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
