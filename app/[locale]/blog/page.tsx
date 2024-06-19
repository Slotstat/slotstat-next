import Image from "next/image";
import Link from "next/link";
import Card from "@/app/components/ui/card";
// import { Button } from "@/app/components/ui/button";
import { client, urlFor } from "@/lib/sanity";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
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

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className=" text-white mt-6 ">
      <h1 className="font-bold text-3xl mb-3">Blog</h1>
      <p className="text-grey1 mb-6">
        SlotStat provides real-time data on slot games.
      </p>

      <div className=" min-h-screen grid grid-cols-1  md:grid-cols-4 mt-5 gap-6">
        {data.map((post, idx) => (
          <Card key={idx} post={post} />
        ))}
      </div>
    </div>
  );
}
