import { unstable_cache } from "next/cache";
import slotStatClient from "./instance";

// Failures throw here so that only successful answers are stored; the
// exported function turns them into an empty list.
const load = unstable_cache(
  async (locale: string, gameId: string): Promise<Card[]> => {
    const res = await slotStatClient(locale).request({
      url: `/api/game/cards/${gameId}`,
      method: "GET",
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return Array.isArray(res.data) ? res.data : [];
  },
  ["getGameCards-v1"],
  { revalidate: 300 }
);

export default async function getGameCards(locale: "en" | "es" | "pt", gameId: string) {
  try {
    if (!gameId) return [];
    return await load(locale, gameId);
  } catch (error: any) {
    // Cards are secondary content: never let a failed fetch take down the
    // whole game page. Log enough to diagnose from the server logs.
    console.error(
      `[getGameCards] ${gameId} failed:`,
      error?.response?.status ?? error?.code ?? "",
      error?.message ?? error
    );
    return [];
  }
}
