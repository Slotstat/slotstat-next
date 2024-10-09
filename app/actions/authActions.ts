"use server";

import { baseUrl } from "@/lib/baseURL";

// import { signIn, signOut } from "@/auth";
// import { AuthError } from "next-auth";
// // import { redirect } from "next/navigation";

// // export async function handleCredentialsSignin({
// //   email,
// //   password,
// // }: {
// //   email: string;
// //   password: string;
// // }) {
// //   try {
// //     await signIn("credentials", { email, password, redirectTo: "/" });
// //   } catch (error) {
// //     if (error instanceof AuthError) {
// //       switch (error.type) {
// //         case "CredentialsSignin":
// //           return {
// //             message: "Invalid credentials",
// //           };
// //         default:
// //           return {
// //             message: "Something went wrong.",
// //           };
// //       }
// //     }
// //     throw error;
// //   }
// // }

// export async function handleCredentialsSignin(formData: FormData) {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   // if (!email || !password) {
//   //   return { message: "Missing email or password" };
//   // }

//   try {
//     const response = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//       // redirectTo: "/"
//     });
//     return response;
//     // If signIn doesn't throw, it was successful
//     // redirect("/");
//   } catch (error) {
//     // if (error instanceof AuthError) {
//     //   switch (error.type) {
//     //     case "CredentialsSignin":
//     //       return { message: "Invalid credentials" };
//     //     default:
//     //       return { message: "Something went wrong." };
//     //   }
//     // }
//     throw error;
//   }
// }

// // export async function authenticate(prevState: string | undefined, formData: FormData) {
// //   console.log("formData", formData);
// //   try {
// //     await signIn("credentials", formData);
// //   } catch (error) {
// //     if (error instanceof AuthError) {
// //       switch (error.type) {
// //         case "CredentialsSignin":
// //           return "Invalid credentials.";
// //         default:
// //           return "Something went wrong.";
// //       }
// //     }
// //     throw error;
// //   }
// // }

// export async function handleSignOut() {
//   await signOut({ redirect: true, redirectTo: "/" });
// }

export async function refreshAccessToken(refreshToken: string) {
    try {
      const response = await fetch(`${baseUrl}/api/user/refreshtoken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_Token: refreshToken }),
      });
      console.log("4444", await response.json());
      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      if (!data.access_Token || !data.refresh_Token) {
        throw new Error("Invalid token response");
      }

      return data;
    } catch (error) {
      console.error("Error in refreshAccessToken:", error);
      return null;
    }
  }