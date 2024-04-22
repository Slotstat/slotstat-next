import slotStatClient from "./instance";

export default async function getCasinoBonuses(locale: "en" | "ka", casinoId: string) {
  try {
    const res = await slotStatClient(locale).request({
      url: `/api/casino/bonus/${casinoId}`,
      method: "GET",
    });

    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return res.data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
}
