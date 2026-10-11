import { client } from "@/lib/sanityLib/sanity";
import { isPublishableName, toSlug } from "@/lib/slug";
import slotStatClient from "@/lib/instance";

const SITE_URL = "https://slotstat.net";
const LOCALES = ["en", "es", "pt"];

// Without this, sitemap.xml is recomputed on every hit — an aggregated backend
// fetch + a Sanity query. Search
// bots (Google, Bing, GPTBot, ClaudeBot, PerplexityBot, …) crawl this
// endpoint repeatedly, so it was the single biggest driver of Fluid CPU and
// origin transfer usage. Matches the revalidate window used elsewhere.
export const revalidate = 3600;

interface CasinoInfo {
  casinoId: string;
  casinoName: string;
}

const NIL_UUID = "00000000-0000-0000-0000-000000000000";

// One aggregated call returns every game together with its casino and
// provider, so casinos, providers and game URLs all come from a single
// backend request.
const getCatalogue = async (): Promise<{
  casinos: CasinoInfo[];
  providerNames: string[];
  gameIds: string[];
}> => {
  try {
    const res = await slotStatClient("en").request({
      url: "/api/Game/aggregated/",
      method: "GET",
      params: { ord: "fixedRtp", direction: "desc", pageSize: 1000 },
    });
    if (res.status !== 200) throw new Error("Failed to fetch aggregated data");

    const games: GameData[] = res.data?.results ?? [];

    const seenCasinos = new Set<string>();
    const casinos: CasinoInfo[] = [];
    const seenProviders = new Set<string>();
    const providerNames: string[] = [];
    const gameIds = new Set<string>();

    for (const game of games) {
      if (game.casinoId && !seenCasinos.has(game.casinoId) && isPublishableName(game.casinoName)) {
        seenCasinos.add(game.casinoId);
        casinos.push({ casinoId: game.casinoId, casinoName: game.casinoName });
      }
      if (game.provider && !seenProviders.has(game.provider) && isPublishableName(game.provider)) {
        seenProviders.add(game.provider);
        providerNames.push(game.provider);
      }
      if (game.gameId && game.gameId !== NIL_UUID) gameIds.add(game.gameId);
    }

    return { casinos, providerNames, gameIds: Array.from(gameIds) };
  } catch (error: any) {
    console.error("[Sitemap] Failed to fetch catalogue:", error?.response?.status ?? "", error?.message ?? error);
    return { casinos: [], providerNames: [], gameIds: [] };
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

// Used for pages that DO have translated content (home, faq, about-us, etc.).
// Emits one URL per locale with full hreflang annotations.
function multiLocaleUrl(path: string, lastModified: Date) {
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified,
    alternates: {
      languages: {
        ...Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
        "x-default": `${SITE_URL}/en${path}`,
      },
    },
  }));
}

// Used for dynamic pages whose content is currently English-only (provider,
// casino, game, blog post). Emits only the /en URL — the /es and /pt variants
// canonicalise to /en, so we don't ask Google to index them.
function enOnlyUrl(path: string, lastModified: Date) {
  return [
    {
      url: `${SITE_URL}/en${path}`,
      lastModified,
    },
  ];
}

export default async function sitemap() {
  const [{ casinos, providerNames, gameIds: allGameIds }, blogSlugs] = await Promise.all([
    getCatalogue(),
    getBlogSlugs(),
  ]);

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

  const casinoDetailUrls = casinos.flatMap((casino) =>
    enOnlyUrl(`/casinos/${toSlug(casino.casinoName)}`, new Date())
  );

  const providerDetailUrls = providerNames.flatMap((name) =>
    enOnlyUrl(`/providers/${toSlug(name)}`, new Date())
  );

  const gameUrls = allGameIds.flatMap((id) =>
    enOnlyUrl(`/${id}`, new Date())
  );

  const blogCategories = ["slots", "casinos", "providers", "news", "education"];
  const blogCategoryUrls = blogCategories.flatMap((cat) =>
    enOnlyUrl(`/blog/${cat}`, new Date())
  );

  const blogArticleUrls = blogSlugs.flatMap((post) =>
    enOnlyUrl(`/blog/${post.category}/${post.slug}`, new Date(post.updatedAt))
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
