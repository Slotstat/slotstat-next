import Breadcrumbs from "@/app/components/Breadcrumbs";
import JsonLd from "@/app/components/JsonLd";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "aboutUs" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      images: "https://slotstat.net/opengraph-image.png",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    alternates: {
      canonical: `/${locale}/about-us`,
      languages: {
        "en-US": "/en/about-us",
        "es-ES": "/es/about-us",
        "pt-PT": "/pt/about-us",
      },
    },
  };
}

export default async function AboutUs({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aboutUs" });
  const breadcrumbs = [{ name: t("title") }];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: t("heading"),
          description: t("metaDescription"),
          url: `https://slotstat.net/${locale}/about-us`,
          publisher: {
            "@type": "Organization",
            name: "SlotStat",
            url: "https://slotstat.net",
          },
        }}
      />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="text-grey1 mb-10">
        <h1 className="text-4xl font-black text-white my-6">{t("heading")}</h1>
        <p className="mb-12">{t("content1")}</p>
        <p className="mb-12">{t("content2")}</p>
        <p className="mb-12">{t("content3")}</p>
      </div>
    </>
  );
}
