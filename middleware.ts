// @ts-nocheck 
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { generateUniqueId } from "./lib/uuid";
import { locales, localePrefix } from "./navigation";

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get("x-default-locale") || "en";

  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    // A list of all locales that are supported
    locales,
    localePrefix,
    defaultLocale,
  });
  const response = handleI18nRouting(request);

  let uniqueId = request.cookies.get("uniqueId")?.value;
  if (!uniqueId) {
    //   // If not found, generate a new unique ID
    uniqueId = generateUniqueId();
    //   // Store the unique ID in localStorage to use it across renders
    response.cookies.set("uniqueId", uniqueId);
  }

  // Step 3: Alter the response
  response.headers.set("x-default-locale", defaultLocale);
  return response;
}

// export const config = {
//   // Skip all paths that should not be internationalized. This example skips the
//   // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ka|en)/:path*"],
};
