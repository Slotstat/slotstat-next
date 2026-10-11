import { unstable_cache } from "next/cache";
import slotStatClient from "./instance";

// Every listing page (casinos, providers, top slots, their detail pages, the
// sitemap) is derived from the same data: the full aggregated game list. The
// backend's Cloudflare layer blocks servers that call it too often, so fetch
// that list once and share it, instead of one filtered request per page.
// The list is identical for every locale.
const TTL_MS = 5 * 60_000;
const PAGE_SIZE = 1000;

// Stored in the Next.js data cache, which on Vercel is shared by every server
// instance and survives restarts. Once the entry is older than `revalidate`
// it is still served while a refresh runs in the background, and a failed
// refresh leaves the old entry in place — so a blocked backend does not take
// pages down as long as one earlier fetch succeeded.
const loadShared = unstable_cache(load, ["catalogue-v1"], {
  revalidate: TTL_MS / 1000,
});

let cached: { at: number; games: GameData[] } | undefined;
let inFlight: Promise<GameData[]> | undefined;

async function load(): Promise<GameData[]> {
  const res = await slotStatClient("en").request({
    url: "/api/Game/aggregated/",
    method: "GET",
    params: { ord: "fixedRtp", direction: "desc", pageSize: PAGE_SIZE },
  });
  const games: GameData[] | undefined = res.data?.results;
  if (res.status !== 200 || !Array.isArray(games)) {
    throw new Error(`Unexpected catalogue response (status ${res.status})`);
  }
  return games;
}

// All games, ordered by fixedRtp descending. Throws when the backend cannot be
// reached and no earlier copy is available: callers must NOT turn that into an
// empty page or a 404, because that result would be cached for the whole
// revalidate window. Letting the error propagate keeps the last good page.
export async function getAllGames(): Promise<GameData[]> {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.games;

  if (!inFlight) {
    inFlight = loadShared()
      .then((games) => {
        cached = { at: Date.now(), games };
        return games;
      })
      .finally(() => {
        inFlight = undefined;
      });
  }

  try {
    return await inFlight;
  } catch (error: any) {
    console.error(
      "[catalogue] fetch failed:",
      error?.response?.status ?? error?.code ?? "",
      error?.message ?? error
    );
    // Prefer slightly stale data over an error.
    if (cached) return cached.games;
    throw error;
  }
}

export async function findGame(gameId: string): Promise<GameData | undefined> {
  const games = await getAllGames();
  return games.find((g) => g.gameId === gameId);
}
