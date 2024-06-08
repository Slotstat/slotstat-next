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
      titleImage
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  console.log(data);

  return (
    <div className=" min-h-screen grid grid-cols-1  md:grid-cols-3 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx} post={post} />
      ))}
    </div>
  );
}
