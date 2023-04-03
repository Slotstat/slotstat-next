
import "../globals.css";

import { ThemeProvider } from "../components/ThemeProviderClientSide";
import { ReactNode } from "react";
import { Locale } from "../i18n/i18n-config";
import type { Metadata } from "next";
import { i18n } from "../i18n/i18n-config";
import { getDictionary } from "../i18n/get-dictionary";
import Header from "../components/navbar/Header";
import Breadcrumbs from "../components/Breadcrumbs";

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
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body>
        <ThemeProvider>
          <Header dictionary={dictionary.navbar} />
          <Breadcrumbs />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
