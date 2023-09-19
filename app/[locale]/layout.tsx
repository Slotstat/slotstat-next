import "../globals.css";
import { ReactNode } from "react";

import type { Metadata } from "next";
import Header from "../components/navbar/Header";
import Footer from "../components/Footer";
import JackpotNotification from "../components/JackpotNotification";
import TooltipClientSide from "../components/TooltipClientSide";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import CookieNotification from "../components/CookieNotification";
import { cookies } from "next/headers";
import GoogleAnalytics from "../components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://slotstat.net"),
  title: {
    default: "SlotStat",
    template: `%s | SlotStat`,
  },
  description: "slot stat high level",
  verification: {
    google:
      "GzHzmiPUgAzESFjJ90fbQbl5w_5kQEktBEB_7sPeZhM",
  },
  // openGraph: {
  //   images: '/opengraph-image.png',
  // },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: "en" | "ka" };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  const uniqueId = cookies().get("uniqueId")?.value;

  return (
    <html lang={locale}>
      <GoogleAnalytics GA_MEASUREMENT_ID="G-SY6HC72KX9" />
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <div className="flex justify-center">
            <div className=" w-[100%] max-w-screen-xl px-4">{children}</div>
          </div>
          <Footer />
          <JackpotNotification />
          <CookieNotification uniqueId={uniqueId} />
          <TooltipClientSide />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
