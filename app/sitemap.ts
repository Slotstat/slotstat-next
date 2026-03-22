import { baseUrl } from "@/lib/baseURL";
import { client } from "@/lib/sanityLib/sanity";
import axios from "axios";

const BASE_URL = "https://slotstat.net/en";

const getCasinos = async (): Promise<{ casinoId: string }[]> => {
  try {
    const res = await axios({
      method: "get",
      url: `${baseUrl}/api/casino/aggregated`,
      headers: { "User-Agent": "Vercel-Worker-Client" },
      timeout: 15000,
    });
    if (res.status !== 200) throw new Error("Failed to fetch casinos");
    return res.data ?? [];
  } catch (error) {
    console.error("[Sitemap] Failed to fetch casinos:", error);
    return [];
  }
};

const getGames = async (casinoIds: string[]): Promise<string[]> => {
  try {
    const responseArray = await Promise.all(
      casinoIds.map(async (casinoId) => {
        try {
          const response = await axios.get(
            `${baseUrl}/api/Game/aggregated/${casinoId}`,
            {
              headers: { "User-Agent": "Vercel-Worker-Client" },
              timeout: 15000,
            }
          );
          if (response.status !== 200) return [];

          const gameURLs =
            response.data?.results?.map((game: GameData) =>
              game.gameId === "00000000-0000-0000-0000-000000000000"
                ? `${casinoId}/${game.casinoId}`
                : `${casinoId}/${game.gameId}`
            ) ?? [];

          return gameURLs;
        } catch {
          console.error(`[Sitemap] Failed to fetch games for casino ${casinoId}`);
          return [];
        }
      })
    );
    return ([] as string[]).concat(...responseArray);
  } catch (error) {
    console.error("[Sitemap] Failed to fetch games:", error);
    return [];
  }
};

const getBlogSlugs = async (): Promise<{ category: string; slug: string; updatedAt: string }[]> => {
  try {
    const query = `*[_type in ["slots", "casinos", "providers", "news", "education"]] {
      "category": _type,
      "slug": slug.current,
      "updatedAt": _updatedAt
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("[Sitemap] Failed to fetch blog slugs:", error);
    return [];
  }
};

export default async function sitemap() {
  const [casinos, blogSlugs] = await Promise.all([getCasinos(), getBlogSlugs()]);

  const casinoIds = casinos.map((c) => c.casinoId);
  const allGameIds = await getGames(casinoIds);

  const staticPages = [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/faq`, lastModified: new Date() },
    { url: `${BASE_URL}/about-us`, lastModified: new Date() },
    { url: `${BASE_URL}/terms-of-use`, lastModified: new Date() },
    { url: `${BASE_URL}/how-it-works`, lastModified: new Date() },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date() },
    { url: `${BASE_URL}/responsible-gaming`, lastModified: new Date() },
  ];

  const casinoUrls = casinos.map((casino) => ({
    url: `${BASE_URL}/${casino.casinoId}`,
    lastModified: new Date(),
  }));

  const gameUrls = allGameIds.map((ids) => ({
    url: `${BASE_URL}/${ids}`,
    lastModified: new Date(),
  }));

  const blogCategories = ["slots", "casinos", "providers", "news", "education"];
  const blogCategoryUrls = blogCategories.map((cat) => ({
    url: `${BASE_URL}/blog/${cat}`,
    lastModified: new Date(),
  }));

  const blogArticleUrls = blogSlugs.map((post) => ({
    url: `${BASE_URL}/blog/${post.category}/${post.slug}`,
    lastModified: new Date(post.updatedAt),
  }));

  return [
    ...staticPages,
    ...casinoUrls,
    ...gameUrls,
    ...blogCategoryUrls,
    ...blogArticleUrls,
  ];
}
