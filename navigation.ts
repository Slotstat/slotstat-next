import { createSharedPathnamesNavigation } from "next-intl/navigation";

// "ka" kept disabled for now
export const locales = ["en", "es", "pt"] as const
export const localePrefix = "always"; // Default

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
