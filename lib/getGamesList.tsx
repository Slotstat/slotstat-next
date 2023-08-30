import slotStatClient from "./instance";

export default async function getGamesList(
  locale: string,
  casinoId: string,
  { keyWord, direction, orderBy }: QueryParams
) {
  try {
    const res = await slotStatClient(locale).request({
      url: `/api/Game/aggregated/${casinoId}`,
      method: "GET",
      params: {
        keyWord,
        ord: orderBy,
        direction: direction || "desc",
      },
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't successfully fetch data");
  }
}
