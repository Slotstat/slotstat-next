// @ts-nocheck
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { generateUniqueId } from "./lib/uuid";
import { locales, localePrefix } from "./navigation";

const BOT_RE =
  /(googlebot|bingbot|duckduckbot|slurp|baiduspider|yandexbot|sogou|exabot|facebot|ia_archiver|gptbot|chatgpt-user|claudebot|anthropic-ai|perplexitybot|google-extended|cohere-ai|applebot|petalbot)/i;

const KA_REDIRECT_RE = /^\/ka(\/|$)/;

// Dynamic routes whose content is English-only (no translations exist).
// /pt and /es variants currently render with canonical=/en, wasting crawl
// budget and creating "Alternate page" / "Crawled — not indexed" noise in GSC.
// Collapse them to a single 301 to the /en equivalent.
const EN_ONLY_DYNAMIC_RE =
  /^\/(pt|es)\/(casinos\/[^/]+|providers\/[^/]+|blog(\/.*)?|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/?$/i;

// Built once at module load. Re-creating this per request added measurable
// CPU on every single page hit — the one cost that scales linearly with
// traffic and is never absorbed by the CDN cache.
const handleI18nRouting = createIntlMiddleware({
  locales,
  localePrefix,
  defaultLocale: "en",
});

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

  // /pt or /es dynamic page → /en equivalent. Static localised pages
  // (/pt/faq, /pt/about-us, /pt, /pt/top-slots, …) are deliberately untouched
  // because they have translated content.
  if (EN_ONLY_DYNAMIC_RE.test(request.nextUrl.pathname)) {
    const target = request.nextUrl.clone();
    target.pathname = request.nextUrl.pathname.replace(/^\/(pt|es)\//, "/en/").replace(/\/$/, "");
    return NextResponse.redirect(target, 301);
  }

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

  const targetCountry = cloudflareCountry || vercelCountry;
  const currentLocCountry = request.cookies.get("currentLocCountry")?.value;
  if (targetCountry && currentLocCountry !== targetCountry) {
    response.cookies.set("currentLocCountry", targetCountry);
  }

  const currentLocRegion = request.cookies.get("currentLocRegion")?.value;
  if (region && currentLocRegion !== region) {
    response.cookies.set("currentLocRegion", region);
  }

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
