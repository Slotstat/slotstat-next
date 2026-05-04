// @ts-nocheck
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { generateUniqueId } from "./lib/uuid";
import { locales, localePrefix } from "./navigation";

const BOT_RE =
  /(googlebot|bingbot|duckduckbot|slurp|baiduspider|yandexbot|sogou|exabot|facebot|ia_archiver|gptbot|chatgpt-user|claudebot|anthropic-ai|perplexitybot|google-extended|cohere-ai|applebot|petalbot)/i;

const KA_REDIRECT_RE = /^\/ka(\/|$)/;

export default async function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") || "";
  const isBot = BOT_RE.test(ua);

  // Hard-fail any /ka or /ka/* legacy path with a permanent 308 to /en/* —
  // defends against next.config.js redirects being bypassed by an edge layer
  // and collapses the trailing-slash hop into a single redirect.
  if (KA_REDIRECT_RE.test(request.nextUrl.pathname)) {
    const target = request.nextUrl.clone();
    target.pathname = request.nextUrl.pathname.replace(/^\/ka\/?/, "/en/").replace(/\/$/, "");
    if (target.pathname === "") target.pathname = "/en";
    return NextResponse.redirect(target, 308);
  }

  const handleI18nRouting = createIntlMiddleware({
    locales,
    localePrefix,
    defaultLocale: "en",
  });

  const response = handleI18nRouting(request);

  // Skip cookie writes for bots — keeps responses cacheable and avoids
  // any side effects on response status propagation.
  if (isBot) return response;

  const { geo } = request;
  const cloudflareCountry = request.headers.get("CF-IPCountry");
  const vercelCountry = geo?.country || "GE";
  const region = geo?.region || "TB";

  let uniqueId = request.cookies.get("uniqueId")?.value;
  let countryFromCookie = request.cookies.get("country")?.value;

  if (!uniqueId) {
    uniqueId = generateUniqueId();
    response.cookies.set("uniqueId", uniqueId);
  }

  if (!countryFromCookie) {
    if (cloudflareCountry) {
      response.cookies.set("country", cloudflareCountry);
    } else if (vercelCountry) {
      response.cookies.set("country", vercelCountry);
    }
    if (region) response.cookies.set("region", region);
  }

  if (cloudflareCountry) {
    response.cookies.set("currentLocCountry", cloudflareCountry);
  } else if (vercelCountry) {
    response.cookies.set("currentLocCountry", vercelCountry);
  }

  if (region) response.cookies.set("currentLocRegion", region);

  return response;
}

// export const config = {
//   // Skip all paths that should not be internationalized. This example skips the
//   // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };
export const config = {
  matcher: ["/", "/(en|es|pt|ka)/:path*"],
};
