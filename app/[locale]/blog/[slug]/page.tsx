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
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="mt-8 max-w-2xl mx-auto px-4">

        <div className="fw-full h-[200px] relative">
          <Image
            src={urlFor(data.titleImage).url()}
            alt="Title Image"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <h1>
          <span className="mt-2 block text-white text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
            {data.title}
          </span>
        </h1>

        <div className="mt-16 prose  prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
          <PortableText value={data.content} />

      </div>
    </div>
  );
}
