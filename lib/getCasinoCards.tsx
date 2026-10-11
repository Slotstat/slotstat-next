import slotStatClient from "./instance";

export default async function getCasinoCards(locale: "en" | "es" | "pt", casinoId: string) {
  try {
    const res = await slotStatClient(locale).request({
      url: `/api/casino/cards/${casinoId}`,
      method: "GET",
    });

    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return Array.isArray(res.data) ? res.data : [];
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
