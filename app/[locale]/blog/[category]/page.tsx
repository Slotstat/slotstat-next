import Card from "@/app/components/ui/card";
import { client } from "@/lib/sanity";
import BlogTabs from "@/app/components/blog/BlogTabs";

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
  params: { locale },
}: {
  params: { locale: "en" | "ka" };
}) {
  try {
    return {
      title: "Slotstat blob",
      description: "find slots and information about each of them!",
      alternates: {
        canonical: `/${locale}/blog`,
        languages: {
          "en-US": `en/blog`,
          "ka-GE": `ka/blog`,
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
          <p className="text-grey1 mb-6">
            SlotStat provides real-time data on slot games.
          </p>
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
