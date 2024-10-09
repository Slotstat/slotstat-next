"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { refreshAccessToken } from "@/app/actions/authActions";
import { useQueryState } from "nuqs";
import { deleteCookie, setCookie } from "cookies-next";

export function AuthCheck() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // const searchParams = useSearchParams();

  const pathname = usePathname();
  const [so, setSo] = useQueryState("so");

  function isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expirationTime;
    } catch (error) {
      console.error("Error parsing token:", error);
      return true;
    }
  }
  
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: pathname + "?so=2" });
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (status === "authenticated" && session) {
        console.log("2222");
        refreshAccessToken(session.refreshToken + "r").then((newTokens) => {
          if (newTokens) {
            console.log("newTokens");
            // Update the session with new tokens
            session.accessToken = newTokens.access_Token;
            session.refreshToken = newTokens.refresh_Token;
          } else {
            console.error("Error checking auth status:");
            handleSignOut();
          }
        });
      }
    };

    if (so == "1") {
      checkAuthStatus();
      // handleSignOut();
    }
  }, [session, status, router]);

  return null;
}
