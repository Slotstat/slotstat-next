import "../globals.css";

import { ThemeProvider } from "../components/ThemeProviderClientSide";
import { ReactNode } from "react";
import { Locale } from "../i18n/i18n-config";
import type { Metadata } from "next";
import { i18n } from "../i18n/i18n-config";
import LocaleSwitcher from "./components/locale-switcher";
import { getDictionary } from "../i18n/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "slot stat",
  description: "slot stat high level",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  // get strings
  // const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body>
        <ThemeProvider>
          <nav>
            <LocaleSwitcher />
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
