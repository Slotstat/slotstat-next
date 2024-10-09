import { NextRequest, NextResponse } from "next/server";
import { auth, signOut } from "./app/api/auth/[...nextAuth]/auth";
import createMiddleware from "next-intl/middleware";
import { generateUniqueId } from "./lib/uuid";
import { locales, localePrefix } from "./navigation";
import { baseUrl } from "./lib/baseURL";
// import { signOut } from "next-auth/react";

const intlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale: "en",
});



// async function refreshAccessToken(refreshToken: string) {
//   try {
//     const response = await fetch(`${baseUrl}/api/user/refreshtoken`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refresh_Token: refreshToken }),
//     });

//     if (!response.ok) {
//       console.log("99");
//       return null;
//       // throw new Error("Failed to refresh token");
//     }

//     const data = await response.json();
//     console.log("88", data);
//     if (!data.access_Token || !data.refresh_Token) {
//       return null;
//       // throw new Error("Invalid token response");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error in refreshAccessToken:", error);
//     return null;
//   }
// }

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

export default auth(async (req) => {
  let response = intlMiddleware(req);
  const pathname = req.nextUrl.pathname;
  console.log("PATH:", pathname);
  const { geo, nextUrl } = req;

  const cloudflareCountry = req.headers.get("CF-IPCountry");
  const region = geo?.region || "TB";

  let uniqueId = req.cookies.get("uniqueId")?.value;
  let countryFromCookie = req.cookies.get("country")?.value;

  if (!uniqueId) {
    uniqueId = generateUniqueId();
    response.cookies.set("uniqueId", uniqueId);
  }

  if (!countryFromCookie && cloudflareCountry) {
    response.cookies.set("country", cloudflareCountry);
  }

  if (cloudflareCountry) {
    response.cookies.set("currentLocCountry", cloudflareCountry);
  }

  if (region) {
    response.cookies.set("currentLocRegion", region);
    if (!countryFromCookie) {
      response.cookies.set("region", region);
    }
  }

  response.headers.set("x-default-locale", "en");

  const session = req.auth;

  const isLoggedIn = !!session;

  const url = nextUrl.clone();
  console.log("--------");

  if (isLoggedIn) {
    const accessToken = session.accessToken;
    const refreshToken = session.refreshToken;
    if (nextUrl.searchParams.get("so") !== "1") {
      if (isTokenExpired(accessToken)) {
        console.log("cookie");
        response.cookies.set("authjs.session-token1", "1");
        // if (!isTokenExpired(accessToken) && nextUrl.searchParams.get("so") !== "2") {
        // url.searchParams.set("so", "1");
        // return NextResponse.redirect(url);
        // try {
        //   const newTokens = await refreshAccessToken(refreshToken + "4");
        //   if (newTokens && newTokens.access_Token && newTokens.refresh_Token) {
        //     console.log("gvaqvs tokenebi");
        //   } else {
        //     response.cookies.set("authjs.session-token1", "1");
        //   }
        // } catch (error) {
        //   // signOut();
        //   console.log("7777");
        //   console.error("Failed to refresh token:", error);
        //   // return signOutUser(req);
        // }
      }
    }
  }

  // Protect specific routes
  const protectedPaths = ["/en/profile"];
  const isProtectedPath = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

  const notReachablePathWhenLoggedIn = ["/en/auth/sign-up", "/en/auth/login"];
  const isNotReachablePathWhenLoggedIn = notReachablePathWhenLoggedIn.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isNotReachablePathWhenLoggedIn && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isProtectedPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/en/auth/login", req.url));
  }

  return response;
});

export const config = {
  matcher: ["/", "/(en)/:path*"],
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    */
  //   // "/((?!api|_next/static|_next/image|favicon.ico).*)",
  //   "/(en)/:path*",
  // ],
};
