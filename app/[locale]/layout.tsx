import "../globals.css";
import { ReactNode } from "react";

import type { Metadata, Viewport } from "next";
import Header from "../components/navbar/Header";
import Footer from "../components/Footer";
import JackpotNotification from "../components/JackpotNotification";
import TooltipClientSide from "../components/TooltipClientSide";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import CookieNotification from "../components/CookieNotification";
// import { cookies } from "next/headers";
// import GoogleAnalytics from "../components/GoogleAnalytics";
import localFont from "next/font/local";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import ChatBot from "../components/ChatBot";
import JsonLd from "../components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://slotstat.net"),
  title: {
    default: "SlotStat | Easy Way to Win & Slots Statistics",
    template: `%s | SlotStat`,
  },
  description:
    "Discover the easiest ways to win with comprehensive slots statistics. SlotStat provides data-driven strategies for players to maximize their winning potential.",
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    google: "bPl9dfYMLYDqQzT7LjnCi9JNyWR_MBqfqE9JFFMaC_U",
  },
  openGraph: {
    images: "/opengraph-image.png",
    type: "website",
    siteName: "SlotStat",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5.0, // Allow zooming for better accessibility/AEO
  userScalable: true,
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

export function generateStaticParams() {
  return [{ locale: "en" }];
  // return [{ locale: "en" }, { locale: "ka" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: "en" | "ka" };
}) {
  unstable_setRequestLocale(locale);
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  // const uniqueId = cookies().get("uniqueId")?.value;

  return (
    <html lang={locale} className={`${modernistBold.variable}`}>
      {/* <GoogleAnalytics gaId="G-SY6HC72KX9" /> */}
      {/* <GoogleAnalytics GA_MEASUREMENT_ID="G-SY6HC72KX9" /> */}
      <GoogleTagManager gtmId="GTM-TNKZW6GT" />
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SlotStat",
              url: "https://slotstat.net",
              logo: "https://slotstat.net/icon-512.png",
              sameAs: ["https://twitter.com/slotstat", "https://facebook.com/slotstat"],
            }}
          />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SlotStat",
              url: "https://slotstat.net",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://slotstat.net/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }}
          />
          <Header />
          <main className="flex justify-center mt-[96px]">
            <div className="w-[100%] max-w-screen-xl 2xl:px-0  px-4">{children}</div>
          </main>
          <Footer />
          <JackpotNotification />
          <ChatBot />
          <CookieNotification />
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
