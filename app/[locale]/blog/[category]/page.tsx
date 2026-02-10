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
  params: { locale: "en" | "ka"; category: string };
}) {
  try {
    return {
      title: "Slotstat blob",
      description: "find slots and information about each of them!",
      alternates: {
        canonical: `/${locale}/blog/${category}`,
        languages: {
          "en-US": `en/blog/${category}`,
          // "ka-GE": `ka/blog/${category}`,
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
