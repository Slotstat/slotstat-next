import slotStatClient from "./instance";

export default async function getSingleGame(gameId: string) {
  try {
    const res = await slotStatClient().request({
      url: `/api/Game/aggregated/single/${gameId}`,
      method: "GET",
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't successfully fetch data");
  }
}
