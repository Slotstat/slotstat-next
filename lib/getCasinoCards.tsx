import { unstable_cache } from "next/cache";
import slotStatClient from "./instance";

// Failures throw here so that only successful answers are stored; the
// exported function turns them into an empty list.
const load = unstable_cache(
  async (locale: string, casinoId: string): Promise<Card[]> => {
    const res = await slotStatClient(locale).request({
      url: `/api/casino/cards/${casinoId}`,
      method: "GET",
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return Array.isArray(res.data) ? res.data : [];
  },
  ["getCasinoCards-v1"],
  { revalidate: 300 }
);

export default async function getCasinoCards(locale: "en" | "es" | "pt", casinoId: string) {
  try {
    if (!casinoId) return [];
    return await load(locale, casinoId);
  } catch (error: any) {
    // Cards are secondary content: never let a failed fetch take down the
    // whole game page. Log enough to diagnose from the server logs.
    console.error(
      `[getCasinoCards] ${casinoId} failed:`,
      error?.response?.status ?? error?.code ?? "",
      error?.message ?? error
    );
    return [];
  }
}
