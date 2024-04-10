import slotStatClient from "./instance";

export default async function getGamesList(
  locale: string,

  { keyWord, direction, orderBy, isFiat }: QueryParams
) {
  if (
    orderBy === "slotInLooseR" ||
    orderBy === "fixedRtp" ||
    orderBy === "slotInLoose"
  ) {
    direction = "desc";
  } else if (orderBy === "slotInWinR" || orderBy === "slotInWin") {
    direction = "asc";
  }

  if (orderBy === "slotInWinR" || orderBy === "slotInLooseR") {
    orderBy = "rtpState";
  } else if (orderBy === "slotInWin" || orderBy === "slotInLoose") {
    orderBy = "currencRtp";
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
        pageSize: 10,
      },
    });

    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't successfully fetch data");
  }
}
