import { baseUrl } from "@/lib/baseURL";
import { client } from "@/lib/sanityLib/sanity";
import axios from "axios";

const SITE_URL = "https://slotstat.net";
const LOCALES = ["en", "es", "pt"];

interface CasinoInfo {
  casinoId: string;
  casinoName: string;
}

const getCasinosAndProviders = async (): Promise<{
  casinos: CasinoInfo[];
  providerNames: string[];
}> => {
  try {
    const res = await axios({
      method: "get",
      url: `${baseUrl}/api/Game/aggregated/`,
      headers: { "User-Agent": "Vercel-Worker-Client", "Accept-Language": "en-US" },
      params: { ord: "fixedRtp", direction: "desc", pageSize: 100 },
      timeout: 15000,
    });
    if (res.status !== 200) throw new Error("Failed to fetch aggregated data");

    const games: GameData[] = res.data?.results ?? [];

    const seenCasinos = new Set<string>();
    const casinos: CasinoInfo[] = [];
    const seenProviders = new Set<string>();
    const providerNames: string[] = [];

    for (const game of games) {
      if (game.casinoId && !seenCasinos.has(game.casinoId)) {
        seenCasinos.add(game.casinoId);
        casinos.push({ casinoId: game.casinoId, casinoName: game.casinoName });
      }
      if (game.provider && !seenProviders.has(game.provider)) {
        seenProviders.add(game.provider);
        providerNames.push(game.provider);
      }
    }

    return { casinos, providerNames };
  } catch (error) {
    console.error("[Sitemap] Failed to fetch casinos/providers:", error);
    return { casinos: [], providerNames: [] };
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
            response.data?.results
              ?.filter(
                (game: GameData) =>
                  game.gameId &&
                  game.gameId !== "00000000-0000-0000-0000-000000000000"
              )
              ?.map((game: GameData) => game.gameId) ?? [];

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

function multiLocaleUrl(path: string, lastModified: Date) {
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
      ),
    },
  }));
}

export default async function sitemap() {
  const [{ casinos, providerNames }, blogSlugs] = await Promise.all([
    getCasinosAndProviders(),
    getBlogSlugs(),
  ]);

  const casinoIds = casinos.map((c) => c.casinoId);
  const allGameIds = await getGames(casinoIds);

  const staticPaths = [
    "",
    "/faq",
    "/about-us",
    "/terms-of-use",
    "/how-it-works",
    "/privacy-policy",
    "/responsible-gaming",
    "/top-slots",
    "/providers",
    "/casinos",
  ];

  const staticPages = staticPaths.flatMap((path) =>
    multiLocaleUrl(path, new Date())
  );

  const casinoDetailUrls = casinos
    .filter((c) => c.casinoName)
    .flatMap((casino) =>
      multiLocaleUrl(`/casinos/${encodeURIComponent(casino.casinoName)}`, new Date())
    );

  const providerDetailUrls = providerNames.flatMap((name) =>
    multiLocaleUrl(`/providers/${encodeURIComponent(name)}`, new Date())
  );

  const gameUrls = allGameIds.flatMap((ids) =>
    multiLocaleUrl(`/${ids}`, new Date())
  );

  const blogCategories = ["slots", "casinos", "providers", "news", "education"];
  const blogCategoryUrls = blogCategories.flatMap((cat) =>
    multiLocaleUrl(`/blog/${cat}`, new Date())
  );

  const blogArticleUrls = blogSlugs.flatMap((post) =>
    multiLocaleUrl(`/blog/${post.category}/${post.slug}`, new Date(post.updatedAt))
  );

  return [
    ...staticPages,
    ...casinoDetailUrls,
    ...providerDetailUrls,
    ...gameUrls,
    ...blogCategoryUrls,
    ...blogArticleUrls,
  ];
}
