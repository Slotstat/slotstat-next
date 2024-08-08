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
import Script from "next/script";
import ChatBot from "../components/ChatBot";

export const metadata: Metadata = {
  metadataBase: new URL("https://slotstat.net"),
  title: {
    default: "SlotStat",
    template: `%s | SlotStat`,
  },
  description:
    "Unique platform which gives you opportunity to choose where to play and win! ",
  verification: {
    google: "bPl9dfYMLYDqQzT7LjnCi9JNyWR_MBqfqE9JFFMaC_U",
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
      {/* <GoogleAnalytics gaId="G-SY6HC72KX9" /> */}
      {/* <GoogleAnalytics GA_MEASUREMENT_ID="G-SY6HC72KX9" /> */}
      <GoogleTagManager gtmId="GTM-TNKZW6GT" />
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* <div className="fixed h-screen w-full bg-black z-50 mt-14"></div>; */}
          <Header />
          <main className="flex justify-center mt-[87px]">
            <div className="w-[100%] max-w-screen-xl lg:px-0 px-4">
              {children}
            </div>
          </main>
          <Footer />
          <JackpotNotification />
          {/* <ChatBot /> */}
          <CookieNotification uniqueId={uniqueId} />
          <TooltipClientSide />
        </NextIntlClientProvider>
      </body>
      {/* <script
        type="text/javascript"
        src="https://betfury.bet/sources/d4c09e4f7.js"
        async
      ></script> */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
               !function(f,b,e,v,n,t,s)
               {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
               n.callMethod.apply(n,arguments):n.queue.push(arguments)};
               if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
               n.queue=[];t=b.createElement(e);t.async=!0;
               t.src=v;s=b.getElementsByTagName(e)[0];
               s.parentNode.insertBefore(t,s)}(window, document,'script',
               'https://connect.facebook.net/en_US/fbevents.js');
               fbq('init', '7159413720830778');
               fbq('track', 'PageView');
          `,
        }}
      />
    </html>
  );
}
