import TableClientSide from "@/app/components/table/TableClientSide";
import { client, urlFor } from "@/lib/sanity";
import {
  PortableText,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
  PortableTextProps,
} from "@portabletext/react";
import { TypedObject } from "@portabletext/types";
import Image from "next/image";

import { headers } from "next/headers";
export const revalidate = 30; // revalidate at most 30 seconds

async function getData(category: string, slug: string) {
  const query = `
    *[_type == "${category}" && slug.current == '${slug}'] {
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
  params: { locale, category, slug },
}: {
  params: { locale: "en" | "ka"; category: string; slug: string };
  searchParams: QueryParamsGamePage;
}) {
  try {
    var data: fullBlog | undefined;
    if (slug) {
      data = await getData(category, slug);
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
            url: absoluteImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
          {
            url: fallbackImageUrl,
            width: 1200,
            height: 630,
            alt: "SlotStat Default Image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: smallDescription,
        images: [absoluteImageUrl, fallbackImageUrl],
      },
      alternates: {
        canonical: `/${locale}/blog/${category}/${slug}`,
        languages: {
          "en-US": `en/blog/${category}/${slug}`,
          "ka-GE": `ka/blog/${category}/${slug}`,
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
// Type for the link value
interface LinkMarkType {
  _type: "link";
  href: string;
}

// Props for the CustomLink component
type CustomLinkProps = PortableTextMarkComponentProps<LinkMarkType>;

const CustomLink: React.FC<CustomLinkProps> = ({ value, children }) => {
  // Check if value exists and has an href property
  if (!value?.href) {
    // If there's no valid href, render the children as plain text
    return <>{children}</>;
  }
  return (
    <a
      href={value.href}
      className="text-primary hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

// Props for the MyPortableTextComponent
interface MyPortableTextComponentProps {
  content: TypedObject | TypedObject[];
}

const MyPortableTextComponent: React.FC<MyPortableTextComponentProps> = ({
  content,
}) => {
  const components: PortableTextProps["components"] = {
    marks: {
      link: CustomLink,
    },
  };

  return (
    <div className="prose prose-lg prose-invert prose-li:marker:text-primary prose-a:text-primary">
      <PortableText value={content} components={components} />
    </div>
  );
};

export default async function BlogArticle({
  params: { category, slug },
}: {
  params: { category: string; slug: string };
}) {
  const data: fullBlog = await getData(category, slug);
  const { titleImage, content, title } = data;

  return (
    <>
      <div className="mt-8 max-w-[856px] mx-auto px-4 mb-12">
        <div className="fw-full h-[400px] relative ">
          {titleImage && (
            <Image
              className="rounded-3xl"
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

        <div className="prose prose-lg prose-invert prose-li:marker:text-primary prose-a:text-primary">
          <MyPortableTextComponent content={content} />
        </div>
      </div>
      <h5>{title}</h5>
      <TableClientSide
        blogSearchFromTitle={title}
        showFilter={false}
        showCryptoFiatSwitcher={false}
      />
    </>
  );
}
