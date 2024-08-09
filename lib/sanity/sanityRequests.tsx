import { client, urlFor } from "@/lib/sanity";

export async function getDataBySlug(category: string, slug: string) {
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
export async function getDataByTitle(category: string, title: string) {
  const query = `
      *[_type == "${category}" && title == '${title}'] {
        title,
        content,
        titleImage,
        smallDescription,
        "currentSlug": slug.current,
        }[0]`;

  const data = await client.fetch(query);

  return data;
}
