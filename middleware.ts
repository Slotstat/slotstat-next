// @ts-nocheck
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { generateUniqueId } from "./lib/uuid";
import { locales, localePrefix } from "./navigation";
import countries from "./lib/countries.json";

export default async function middleware(request: NextRequest) {
  const { nextUrl: url, geo } = request;

  const country = geo.country || "GE";

  // const city = geo.city || "San Francisco";
  const region = geo.region || "TB";

  const countryInfo = countries.find((x) => x.cca2 === country);

  // const currencyCode = Object.keys(countryInfo.currencies)[0];
  // const currency = countryInfo.currencies[currencyCode];
  // const languages = Object.values(countryInfo.languages).join(", ");

  // const country1 = request.headers.get('cf-ipcountry') || 'Unknown'

  // Step 1: Use the incoming request
  const defaultLocale =
    request.headers.get("x-default-locale") || "en";

  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    // A list of all locales that are supported
    locales,
    localePrefix,
    defaultLocale,
  });

  const response = handleI18nRouting(request);

  let uniqueId = request.cookies.get("uniqueId")?.value;
  let countryFromCookie = request.cookies.get("country")?.value;

  if (!uniqueId) {
    //   // If not found, generate a new unique ID
    uniqueId = generateUniqueId();
    //   // Store the unique ID in localStorage to use it across renders
    response.cookies.set("uniqueId", uniqueId);
  }

  if (!countryFromCookie) {
    country && response.cookies.set("country", country);
    region && response.cookies.set("region", region);
  }
  country && response.cookies.set("currentLocCountry", country);
    region && response.cookies.set("currentLocRegion", region);

  // city && response.cookies.set("city", city);

  // response.headers.set('testcountry1', country1)

  // response.headers.set("country", country);
  // response.headers.set("city", city);
  // response.headers.set("region", region);
  // response.headers.set("currencyCode", currencyCode);
  // response.headers.set("currencySymbol", currency.symbol);
  // response.headers.set("name", currency.name);
  // response.headers.set("languages", languages);
  // Step 3: Alter the response
  response.headers.set("x-default-locale", defaultLocale);
  NextResponse.rewrite(url);
  return response;
}

// export const config = {
//   // Skip all paths that should not be internationalized. This example skips the
//   // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en)/:path*"],
};
