import { client, urlFor } from "@/lib/sanity";

export default async function getSpecificBlogPostByTitle(
  category: string,
  title: string
) {
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
