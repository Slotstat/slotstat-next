import "../globals.css";
import { ReactNode } from "react";

import type { Metadata, Viewport } from "next";
import Header from "../components/navbar/Header";
import Footer from "../components/Footer";
import JackpotNotification from "../components/JackpotNotification";
import TooltipClientSide from "../components/TooltipClientSide";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import CookieNotification from "../components/CookieNotification";
import { cookies } from "next/headers";
// import GoogleAnalytics from "../components/GoogleAnalytics";
import localFont from "next/font/local";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  // metadataBase: new URL("https://slotstat.net"),
  title: {
    default: "SlotStat",
    template: `%s | SlotStat`,
  },
  description:
    "Unique platform which gives you opportunity to choose where to play and win! ",
  verification: {
    google: "GzHzmiPUgAzESFjJ90fbQbl5w_5kQEktBEB_7sPeZhM",
  },
  openGraph: {
    images: "../opengraph-image.png",
  },
  // viewport:
  //   "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1.0,
  userScalable: false,
};

const modernistBold = localFont({
  src: [
    {
      path: "../../public/fonts/Sk-Modernist-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Sk-Modernist-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-Modernist",
  display: "swap",
});

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
    <html lang={locale} className={`${modernistBold.variable}`}>
      <GoogleAnalytics gaId="G-SY6HC72KX9" />
      {/* <GoogleAnalytics GA_MEASUREMENT_ID="G-SY6HC72KX9" /> */}
      <GoogleTagManager gtmId="GTM-TNKZW6GT" />
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <div className="flex justify-center mt-[87px]">
            <div className="w-[100%] max-w-screen-xl lg:px-0 px-4">
              {children}
            </div>
          </div>
          <Footer />
          <JackpotNotification />
          <CookieNotification uniqueId={uniqueId} />
          <TooltipClientSide />
        </NextIntlClientProvider>
      </body>
      {/* <script
        type="text/javascript"
        src="https://betfury.bet/sources/d4c09e4f7.js"
        async
      ></script> */}
    </html>
  );
}
