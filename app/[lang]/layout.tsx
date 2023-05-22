import "../globals.css";

import { ThemeProvider } from "../components/ThemeProviderClientSide";
import { ReactNode } from "react";
import { Locale, i18n } from "../i18n/i18n-config";
import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import { getDictionary } from "../i18n/get-dictionary";
import Header from "../components/navbar/Header";
import Footer from "../components/Footer";

// export async function generateStaticParams() {
//   return i18n.locales.map((locale) => ({ lang: locale }));
// }

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
          <Header dictionary={dictionary} />
          {/* <Breadcrumbs /> */}
          <div className="flex justify-center">
            <div className=" w-[100%] max-w-screen-xl">{children}</div>
          </div>
          <Footer dictionary={dictionary} />
        </ThemeProvider>
      </body>
    </html>
  );
}
