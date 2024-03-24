import slotStatClient from "./instance";

export default async function getGamesList(
  locale: string,

  { keyWord, direction, orderBy, isFiat }: QueryParams
) {
  if (orderBy === "slotInLoose" || orderBy === "fixedRtp") {
    direction = "desc";
  } else if (orderBy === "slotInWin") {
    direction = "asc";
  }

  if (orderBy === "slotInWin" || orderBy === "slotInLoose") {
    orderBy = "rtpState";
  }

  try {
    const res = await slotStatClient(locale).request({
      url: `/api/Game/aggregated/`,
      method: "GET",
      params: {
        keyWord,
        ord: orderBy || null,
        direction: direction,
        isCrypto: isFiat === "false" ? true : null,
        isFiat: isFiat === "true" ? true : null,
        pageSize: 200,
      },
    });

    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't successfully fetch data");
  }
}
