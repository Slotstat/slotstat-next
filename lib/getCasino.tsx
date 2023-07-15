import slotStatClient from "./instance";

export default async function getCasino(casinoId: string) {
  try {
    const res = await slotStatClient().request({
      url: `/api/casino/aggregated/${casinoId.substring(
        0,
        casinoId.length - 3
      )}`,
      method: "GET",
    });

    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
}
