import slotStatClient from "./instance";

export default async function getGameCards(gameId: string) {
  try {
    const res = await slotStatClient.request({
      url: `/api/game/cards/${gameId}`,
      method: "GET",
    });

    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
