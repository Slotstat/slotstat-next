import Breadcrumbs from "@/app/components/Breadcrumbs";
import JsonLd from "@/app/components/JsonLd";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "howItWorks" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      images: "https://slotstat.net/opengraph-image.png",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    alternates: {
      canonical: `/${locale}/how-it-works`,
      languages: {
        "en-US": "/en/how-it-works",
        "es-ES": "/es/how-it-works",
        "pt-PT": "/pt/how-it-works",
      },
    },
  };
}

export default async function HowItWorks({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "howItWorks" });
  const breadcrumbs = [{ name: t("title") }];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t("heading"),
          description: t("intro"),
          url: `https://slotstat.net/${locale}/how-it-works`,
          step: [
            {
              "@type": "HowToStep",
              name: "RTP",
              text: t("rtpDesc"),
              position: 1,
            },
            {
              "@type": "HowToStep",
              name: "RTP Swing",
              text: t("rtpSwingDesc"),
              position: 2,
            },
            {
              "@type": "HowToStep",
              name: "Win Spin Rate",
              text: t("winSpinRateDesc"),
              position: 3,
            },
            {
              "@type": "HowToStep",
              name: "Jackpot",
              text: t("jackpotDesc"),
              position: 4,
            },
          ],
        }}
      />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="text-grey1 mb-10">
        <h1 className="text-4xl font-black text-white my-6">{t("heading")}</h1>
        <h2 className="mb-8">{t("intro")}</h2>
        <p>{t("figuresLabel")}</p>
        <ol className="list-decimal list-inside mb-10">
          <li>{t("rtpDesc")}</li>
          <li>{t("rtpSwingDesc")}</li>
          <li>{t("winSpinRateDesc")}</li>
          <li>{t("jackpotDesc")}</li>
        </ol>
      </div>
    </>
  );
}
