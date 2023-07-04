import slotStatClient from "./instance";

export default async function getGamesList(
  casinoId: string,
  { keyWord, direction, orderBy }: QueryParams
) {
  try {
    const res = await slotStatClient.request({
      url: `/api/Game/aggregated/${casinoId}`,
      method: "GET",
      params: {
        keyWord,
        direction,
        orderBy,
      },
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
