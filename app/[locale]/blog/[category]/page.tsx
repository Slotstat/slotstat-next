import Card from "@/app/components/ui/card";

import BlogTabs from "@/app/components/blog/BlogTabs";
import { client } from "@/lib/sanity/sanity";

export const revalidate = 30; // revalidate at most 30 seconds

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

export default async function Home({
  params: { category },
}: {
  params: { category: string };
}) {
  const data: simpleBlogCard[] = await getData(category);

  return (
    <div className="text-white mt-6 ">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-3xl mb-3">Blog</h1>
          <p className="text-grey1 mb-6">All players need to know.</p>
        </div>
        <BlogTabs ActiveCategory={category} />
      </div>
      <div className=" min-h-screen grid grid-cols-1  md:grid-cols-4 mt-5 gap-6">
        {data.map((post, idx) => (
          <Card key={idx} post={post} />
        ))}
      </div>
    </div>
  );
}
