import JsonLd from "@/app/components/JsonLd";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "responsibleGaming" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      images: "https://slotstat.net/opengraph-image.png",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    alternates: {
      canonical: `/${locale}/responsible-gaming`,
      languages: {
        "en-US": "/en/responsible-gaming",
        "es-ES": "/es/responsible-gaming",
        "pt-PT": "/pt/responsible-gaming",
      },
    },
  };
}

export default async function ResponsibleGaming({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "responsibleGaming" });

  return (
    <div className="text-grey1 mb-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: t("metaTitle"),
          description: t("metaDescription"),
          url: `https://slotstat.net/${locale}/responsible-gaming`,
          publisher: {
            "@type": "Organization",
            name: "SlotStat",
            url: "https://slotstat.net",
          },
        }}
      />
      <h1 className="text-4xl font-black text-white my-6">{t("heading")}</h1>
      <h2 className="text-xl font-bold my-4">{t("commitment")}</h2>
      <ul className="list-disc ml-6">
        <li>{t("item1")}</li>
        <li>{t("item2")}</li>
        <li>{t("item3")}</li>
        <li>{t("item4")}</li>
      </ul>
      <h2 className="text-lg font-semibold my-4">{t("warningSignsTitle")}</h2>
      <ul className="list-disc ml-6">
        <li>{t("sign1")}</li>
        <li>{t("sign2")}</li>
        <li>{t("sign3")}</li>
        <li>{t("sign4")}</li>
      </ul>
      <h2 className="text-lg font-semibold mt-4">{t("gettingHelp")}</h2>
      <p className="mb-4">{t("helpContact")}</p>
      <ul className="list-disc ml-6">
        <li>Gamblers Anonymous</li>
        <li>National Problem Gambling Helpline</li>
        <li>BeGambleAware</li>
      </ul>
      <p className="mt-8">{t("closingMessage")}</p>
    </div>
  );
}
