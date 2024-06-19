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
          titleImage,
          smallDescription
      }[0]`;

  const data = await client.fetch(query);

  return data;
}

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: "en" | "ka" };
  searchParams: QueryParamsGamePage;
}) {
  try {
    var data: fullBlog | undefined;
    if (slug) {
      data = await getData(slug);
    }

    if (!data)
      return {
        title: "Not found",
        description: "The page you are looking for doesn't exists",
      };

    const { titleImage, smallDescription, title } = data;

    return {
      title: title,
      description: smallDescription,
      openGraph: {
        // ...openGraphImage,
        images: titleImage,
        title: title,
        description: smallDescription,
      },
      alternates: {
        canonical: `/${locale}/blog/${slug}`,
        languages: {
          "en-US": `en/blog/${slug}`,
          "ka-GE": `ka/blog/${slug}`,
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

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);
  const { titleImage, content, title } = data;

  return (
    <div className="mt-8 max-w-[856px] mx-auto px-4 mb-12">
      <div className="fw-full h-[400px] relative">
        <Image
          src={urlFor(titleImage).url()}
          alt={title}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <h1 className=" my-8 block text-white text-3xl  leading-8 font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>

      <div className="prose  prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={content} />
      </div>
    </div>
  );
}
