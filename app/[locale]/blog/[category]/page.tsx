import Card from "@/app/components/ui/card";

import BlogTabs from "@/app/components/blog/BlogTabs";
import { client } from "@/lib/sanityLib/sanity";

export const revalidate = 3600; // revalidate at most 1 hour

async function getData(category: string) {
  const query = `
  *[_type == '${category}'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      _createdAt
  }`;
  const data = await client.fetch(query);

  return data;
}

export async function generateMetadata({
  params: { locale, category },
}: {
  params: { locale: "en" | "es" | "pt"; category: string };
}) {
  const categoryMeta: Record<string, { title: string; description: string }> = {
    slots: {
      title: "SlotStat Blog - Slot Game Insights",
      description: "Read the latest articles about slot games, RTP analysis, and winning strategies.",
    },
    casinos: {
      title: "SlotStat Blog - Casino Reviews & Analysis",
      description: "In-depth casino reviews, bonus comparisons, and data-driven casino analysis.",
    },
    providers: {
      title: "SlotStat Blog - Game Provider Spotlights",
      description: "Explore game providers, their top slots, and RTP trends across different studios.",
    },
    news: {
      title: "SlotStat Blog - Gambling Industry News",
      description: "Stay updated with the latest gambling industry news, regulations, and trends.",
    },
    education: {
      title: "SlotStat Blog - Gambling Education",
      description: "Learn about RTP, volatility, win spin rate, and other key gambling concepts.",
    },
  };

  const meta = categoryMeta[category] ?? {
    title: "SlotStat Blog",
    description: "Read the latest articles about slots, casinos, and gambling insights.",
  };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      images: "https://slotstat.net/opengraph-image.png",
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["https://slotstat.net/opengraph-image.png"],
    },
    alternates: {
      canonical: `/${locale}/blog/${category}`,
      languages: {
        "en-US": `/en/blog/${category}`,
        "es-ES": `/es/blog/${category}`,
        "pt-PT": `/pt/blog/${category}`,
      },
    },
  };
}

import { unstable_setRequestLocale } from "next-intl/server";
import JsonLd from "../../../components/JsonLd";

export function generateStaticParams() {
  const categories = ["slots", "casinos", "providers", "news", "education"];
  return categories.map((category) => ({
    category: category,
  }));
}

export default async function Home({
  params: { category, locale },
}: {
  params: { category: string; locale: string };
}) {
  unstable_setRequestLocale(locale);
  const data: simpleBlogCard[] = await getData(category);

  return (
    <div className="text-white mt-6 mb-12 md:mb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Blog - ${category}`,
          description: `Read the latest articles about ${category}.`,
          url: `https://slotstat.net/${locale}/blog/${category}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: data.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://slotstat.net/${locale}/blog/${category}/${post.currentSlug}`,
            })),
          },
        }}
      />
      <BlogTabs ActiveCategory={category} />

      <div className=" min-h-96 grid grid-cols-1 md:grid-cols-4 mt-5 gap-6">
        {data.map((post, idx) => (
          <Card key={idx} post={post} />
        ))}
      </div>
    </div>
  );
}
