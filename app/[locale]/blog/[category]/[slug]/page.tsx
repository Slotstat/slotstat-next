import TableClientSide from "@/app/components/table/TableClientSide";
import { client, urlFor } from "@/lib/sanityLib/sanity";

import Image from "next/image";

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import MyPortableTextComponent from "@/app/components/blog/BlogPortableText";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import JsonLd from "@/app/components/JsonLd";

export const revalidate = 3600; // revalidate at most 1 hour

async function getDataBySlug(category: string, slug: string) {
  const query = `
      *[_type == "${category}" && slug.current == '${slug}'] {
        title,
        content,
        titleImage,
        smallDescription,
        "currentSlug": slug.current,
        _createdAt,
        _updatedAt
        }[0]`;

  const data = await client.fetch(query);

  return data;
}

export async function generateStaticParams() {
  const query = `*[_type in ["slots", "casinos", "providers", "news", "education"]] {
    "category": _type,
    "slug": slug.current
  }`;
  const posts = await client.fetch(query);

  return posts.map((post: any) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params: { locale, category, slug },
}: {
  params: { locale: "en" | "es" | "pt"; category: string; slug: string };
  searchParams: QueryParamsGamePage;
}) {
  let data: fullBlog | undefined;
  try {
    data = slug ? await getDataBySlug(category, slug) : undefined;
  } catch {
    data = undefined;
  }

  if (!data) {
    notFound();
  }

  const { titleImage, smallDescription, title } = data;

  const headersList = await headers();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${headersList.get("host")}`;
  const absoluteImageUrl = new URL(urlFor(titleImage).url(), baseUrl).toString();
  const pageUrl = new URL(`/${locale}/blog/${category}/${slug}`, baseUrl).toString();

  return {
    title,
    description: smallDescription,
    openGraph: {
      title,
      description: smallDescription,
      url: pageUrl,
      siteName: "SlotStat",
      locale,
      type: "article",
      images: [
        {
          url: absoluteImageUrl,
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
      images: [absoluteImageUrl],
    },
    alternates: {
      canonical: `/${locale}/blog/${category}/${slug}`,
      languages: {
        "en-US": `/en/blog/${category}/${slug}`,
        "es-ES": `/es/blog/${category}/${slug}`,
        "pt-PT": `/pt/blog/${category}/${slug}`,
      },
    },
  };
}

import { unstable_setRequestLocale } from "next-intl/server";

export default async function BlogArticle({
  params: { category, slug, locale },
}: {
  params: { category: string; slug: string; locale: string };
}) {
  unstable_setRequestLocale(locale);
  const data: fullBlog = await getDataBySlug(category, slug);

  if (!data) return notFound();

  const { titleImage, content, title, _createdAt, _updatedAt } = data;
  const breadcrumbs = [{ name: category, url: `/blog/${category}` }, { name: title }];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `https://slotstat.net/${locale}` },
            { "@type": "ListItem", position: 2, name: category, item: `https://slotstat.net/${locale}/blog/${category}` },
            { "@type": "ListItem", position: 3, name: title },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          image: [urlFor(titleImage).url()],
          datePublished: _createdAt,
          dateModified: _updatedAt || _createdAt,
          description: data.smallDescription,
          author: [
            {
              "@type": "Organization",
              name: "SlotStat",
              url: "https://slotstat.net",
            },
          ],
        }}
      />
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
      {(category === "slots" || category === "providers" || category === "casinos") && (
        <div className="mb-3 md:mb-6 lg:mb-12">
          <h5 className="text-white text-2xl font-bold  md:-mb-16">{title}</h5>
          <TableClientSide blogSearchFromTitle={title} showFilter={true} showSearch={false} />
        </div>
      )}
    </>
  );
}
