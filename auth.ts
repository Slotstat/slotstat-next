import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { signInSchema } from "./lib/zod";
import { z, ZodError } from "zod";

const getUserFromDb = async (email: string, password: string) => {
  // Simulating database access delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { id: "1", name: "traki", email: "traki@traki.com" };
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        let user = null;

        // const parsedCredentials1 = z
        //   .object({ email: z.string().email(), password: z.string().min(6) })
        //   .safeParse(credentials);
        // console.log("parsedCredentials1111", parsedCredentials1);
        // if (parsedCredentials1.success) {
        //   const { email, password } = parsedCredentials1.data;
        //   console.log(44444, email, password);
        //   const user = await {
        //     id: "1",
        //     name: "Aditya Singh",
        //     email: "jojo@jojo.com",
        //     role: "admin",
        //   };
        //   if (!user) return null;
        // }

        // validate credentials
        console.log("credentials", credentials);
        const parsedCredentials = signInSchema.safeParse(credentials);
        console.log("parsedCredentials", parsedCredentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }
        // get user

        user = {
          id: "1",
          name: "Aditya Singh",
          email: "jojo@jojo.com",
          role: "admin",
        };

        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
});
