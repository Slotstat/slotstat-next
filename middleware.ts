import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/api/auth/[...nextAuth]/auth";
import createMiddleware from "next-intl/middleware";
import { generateUniqueId } from "./lib/uuid";
import { locales, localePrefix } from "./navigation";
import { baseUrl } from "./lib/baseURL";

const intlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale: "en",
});

async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(`${baseUrl}/api/user/refreshtoken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_Token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return response.json();
}

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
  const response = intlMiddleware(req);
  const { geo } = req;
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

  // Check if the user is authenticated
  const session = req.auth;

  const isLoggedIn = !!session;

  if (isLoggedIn) {
    const accessToken = session.accessToken;
    const refreshToken = session.refreshToken;

    if (isTokenExpired(accessToken)) {
      try {
        const newTokens = await refreshAccessToken(refreshToken);
        // Update the session with new tokens
        session.accessToken = newTokens.access_Token;
        session.refreshToken = newTokens.refresh_Token;
        // You might need to update the session in the response
        // This depends on how NextAuth stores the session
        // You may need to use a custom session strategy for this
      } catch (error) {
        console.error("Failed to refresh token:", error);
        // Redirect to login if refresh fails
        return NextResponse.redirect(new URL("/en/auth/login", req.url));
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
};
