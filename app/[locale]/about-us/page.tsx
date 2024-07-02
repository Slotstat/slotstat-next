import Breadcrumbs from "@/app/components/Breadcrumbs";
import React from "react";
const breadcrumbs = [{ name: "About us" }];

export async function generateMetadata() {
  try {
    return {
      title: "Slotstat about us",
      description:
        "Unique platform which gives you opportunity to choose where to play and win! ",
      openGraph: {
        // ...openGraphImage,
        images: "../opengraph-image.png",
        title: "about us",
        description:
          "Slotstat, Unique platform which gives you opportunity to choose where to play and win by using statistics!",
      },
      alternates: {
        canonical: `/about-us`,
        languages: {
          "en-US": `en/about-us`,
          "ka-GE": `ka/about-us`,
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

export default function AboutUs() {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="text-grey1 mb-10">
        <h1 className=" text-4xl font-black text-white my-6">About Us</h1>
        <p className="mb-12">
          SlotStat is a data-driven platform and affiliate service provider that
          helps players to be more aware while gambling in regard to solidified
          information of slot statistics.
        </p>
        <p className="mb-12">
          The SlotStat team during the years were observing, learning and
          analyzing slot game statistics, doing research and developing its own
          algorithms.
        </p>
        <p className="mb-12">
          SlotStat is an innovative approach in the gambling industry, providing
          players with comprehensive data insights and empowering them to make
          informed decisions for a more rewarding gambling experience.
        </p>
      </div>
    </>
  );
}
