import { unstable_cache } from "next/cache";
import slotStatClient from "./instance";

async function load(gameId: string) {
  const res = await slotStatClient().request({
    url: `/api/Game/aggregated/single/${gameId}`,
    method: "GET",
  });
  if (res.status != 200 || !res.data) {
    throw new Error("Can't successfully fetch data");
  }
  return res.data;
}

// Shared across server instances (see lib/catalogue.ts): a stale copy keeps
// being served when the backend refuses the refresh.
const loadShared = unstable_cache(load, ["single-game-v1"], { revalidate: 60 });

export default async function getSingleGame(gameId: string | undefined) {
  if (gameId) {
    try {
      return await loadShared(gameId);
    } catch (error) {
      throw new Error("Can't successfully fetch data");
    }
  } else {
    return undefined;
  }
}
