// export const dynamic = 'force-static';
import "../globals.css";

import { ReactNode } from "react";

import type { Metadata } from "next";
// import Breadcrumbs from "../components/Breadcrumbs";
import Header from "../components/navbar/Header";
import Footer from "../components/Footer";
import JackpotNotification from "../components/JackpotNotification";
import TooltipClientSide from "../components/TooltipClientSide";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ka" }];
}

export const metadata: Metadata = {
  title: "slot stat",
  description: "slot stat high level",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  // todo
  params: { locale: any };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {/* <Breadcrumbs /> */}
          <div className="flex justify-center">
            <div className=" w-[100%] max-w-screen-xl">{children}</div>
          </div>
          <Footer />
          <JackpotNotification />
          <TooltipClientSide />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
