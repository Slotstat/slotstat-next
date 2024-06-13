import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]`;

  const data = await client.fetch(query);
  console.log("data", data);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="mt-8 max-w-[856px] mx-auto px-4 mb-12">
      <div className="fw-full h-[400px] relative">
        <Image
          src={urlFor(data.titleImage).url()}
          alt="Title Image"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <h1 className=" my-8 block text-white text-3xl  leading-8 font-bold tracking-tight sm:text-4xl">
        {data.title}
      </h1>

      <div className="prose  prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
