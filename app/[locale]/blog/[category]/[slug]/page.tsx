import TableClientSide from "@/app/components/table/TableClientSide";
import { client, urlFor } from "@/lib/sanityLib/sanity";

import Image from "next/image";

import { headers } from "next/headers";
import MyPortableTextComponent from "@/app/components/blog/BlogPortableText";
import Breadcrumbs from "@/app/components/Breadcrumbs";
export const revalidate = 30; // revalidate at most 30 seconds

async function getDataBySlug(category: string, slug: string) {
  const query = `
      *[_type == "${category}" && slug.current == '${slug}'] {
        title,
        content,
        titleImage,
        smallDescription,
        "currentSlug": slug.current,
        }[0]`;

  const data = await client.fetch(query);

  return data;
}

export async function generateMetadata({
  params: { locale, category, slug },
}: {
  params: { locale: "en" | "ka"; category: string; slug: string };
  searchParams: QueryParamsGamePage;
}) {
  try {
    var data: fullBlog | undefined;
    if (slug) {
      data = await getDataBySlug(category, slug);
    }

    if (!data)
      return {
        title: "Not found",
        description: "The page you are looking for doesn't exists",
      };

    const { titleImage, smallDescription, title } = data;

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || `https://${headers().get("host")}`;
    const absoluteImageUrl = new URL(
      urlFor(titleImage).url(),
      baseUrl
    ).toString();
    const pageUrl = new URL(
      `/${locale}/blog/${category}/${slug}`,
      baseUrl
    ).toString();
    const fallbackImageUrl = new URL(
      "../../../../opengraph-image.png",
      baseUrl
    ).toString();

    const timestampedImageUrl = `${absoluteImageUrl}?t=${Date.now()}`;

    return {
      title: title,
      description: smallDescription,
      // openGraph: {
      //   images: [
      //     {
      //       url: urlFor(titleImage).url(), // Use the blog's title image URL
      //       width: 1200,
      //       height: 630,
      //       alt: title,
      //     },
      //   ],
      //   title: title,
      //   description: smallDescription,
      // },
      openGraph: {
        title,
        description: smallDescription,
        url: pageUrl,
        siteName: "SlotStat",
        locale: locale,
        type: "article",
        images: [
          {
            url: timestampedImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: smallDescription,
        images: [timestampedImageUrl],
      },
      alternates: {
        canonical: `/${locale}/blog/${category}/${slug}`,
        languages: {
          "en-US": `en/blog/${category}/${slug}`,
          // "ka-GE": `ka/blog/${category}/${slug}`,
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
  params: { category, slug, locale },
}: {
  params: { category: string; slug: string; locale: string };
}) {
  const data: fullBlog = await getDataBySlug(category, slug);
  const { titleImage, content, title } = data;
  const breadcrumbs = [
    { name: category, url: `/blog/${category}` },
    { name: title },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="mt-8 max-w-[856px] mx-auto px-4 mb-12">
        <div className="w-full h-40 md:h-[400px] relative ">
          {titleImage && (
            <Image
              className="rounded-xl md:rounded-3xl"
              src={urlFor(titleImage).url()}
              alt={title}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <h1 className=" my-8 block text-white text-3xl  leading-8 font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <MyPortableTextComponent content={content} />
      </div>
      {(category === "slots" ||
        category === "providers" ||
        category === "casinos") && (
        <>
          <h5 className="text-white text-2xl font-bold -mb-12 md:-mb-16">{title}</h5>
          <TableClientSide
            blogSearchFromTitle={title}
            showFilter={true}
            showSearch={false}
          />
        </>
      )}
    </>
  );
}
