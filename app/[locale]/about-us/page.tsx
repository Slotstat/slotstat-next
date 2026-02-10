import Breadcrumbs from "@/app/components/Breadcrumbs";
import React from "react";
const breadcrumbs = [{ name: "About us" }];

export async function generateMetadata() {
  try {
    return {
      title: "About US",
      description:
        "Learn how SlotStat uses data-driven insights and innovative algorithms to provide players with valuable slot statistics for smarter gambling decisions.",
      openGraph: {
        // ...openGraphImage,
        images: "../opengraph-image.png",
        title: "about us",
        description:
          "Learn how SlotStat uses data-driven insights and innovative algorithms to provide players with valuable slot statistics for smarter gambling decisions.",
      },
      alternates: {
        canonical: `/about-us`,
        languages: {
          "en-US": `en/about-us`,
          // "ka-GE": `ka/about-us`,
        },
      },
    };
  } catch (error) {
    return {
      title: "Not found",
      description: "The page you are looking for doesn't exists",
    };
  }
}

import { unstable_setRequestLocale } from "next-intl/server";

export default function AboutUs({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="text-grey1 mb-10">
        <h1 className=" text-4xl font-black text-white my-6">About Us</h1>
        <p className="mb-12">
          SlotStat is a data-driven platform and affiliate service provider that helps players to be
          more aware while gambling in regard to solidified information of slot statistics.
        </p>
        <p className="mb-12">
          The SlotStat team during the years were observing, learning and analyzing slot game
          statistics, doing research and developing its own algorithms.
        </p>
        <p className="mb-12">
          SlotStat is an innovative approach in the gambling industry, providing players with
          comprehensive data insights and empowering them to make informed decisions for a more
          rewarding gambling experience.
        </p>
      </div>
    </>
  );
}
