"use client";
import slotStatClientInstance from "./clientInstance";

export default async function getGameListClientSide({
  keyWord,
  direction,
  orderBy,
  isFiat,
  page,
}: QueryParams) {
  if (
    orderBy === "slotInLooseR" ||
    orderBy === "fixedRtp" ||
    orderBy === "slotInLoose" ||
    orderBy === "spsH"
  ) {
    direction = "desc";
  } else if (
    orderBy === "slotInWinR" ||
    orderBy === "slotInWin" ||
    orderBy === "spsL"
  ) {
    direction = "asc";
  }

  if (orderBy === "slotInWinR" || orderBy === "slotInLooseR") {
    orderBy = "rtpState";
  } else if (orderBy === "slotInWin" || orderBy === "slotInLoose") {
    orderBy = "currencRtp";
  } else if (orderBy === "spsL" || orderBy === "spsH") {
    orderBy = "sps";
  }

  try {
    const res = await slotStatClientInstance().request({
      url: `/api/Game/aggregated`,
      method: "GET",
      params: {
        keyWord,
        ord: orderBy || null,
        direction: direction,
        isCrypto: isFiat === "false" ? true : null,
        isFiat: isFiat === "true" ? true : null,
        pageSize: 10,
        page: page || 1,
      },
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't successfully fetch data");
  }
}
