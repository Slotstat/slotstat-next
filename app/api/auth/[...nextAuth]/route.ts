import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string() })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        // Here, you would typically check the credentials against your database
        // For this example, we're using a dummy check
        if (parsedCredentials.data.username === "user" && parsedCredentials.data.password === "password") {
          return { id: "1", name: "User", email: "user@example.com" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }