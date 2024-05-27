"use client";
import slotStatClientInstance from "./clientInstance";

export default async function getGameListClientSide({
  keyWord,
  direction,
  orderBy,
  isFiat,
  page,
  ids,
}: QueryParams) {
  if (
    orderBy === "slotInLoseR" ||
    orderBy === "fixedRtp" ||
    orderBy === "slotInLose" ||
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

  if (orderBy === "slotInWinR" || orderBy === "slotInLoseR") {
    orderBy = "rtpState";
  } else if (orderBy === "slotInWin" || orderBy === "slotInLose") {
    orderBy = "currencRtp";
  } else if (orderBy === "spsL" || orderBy === "spsH") {
    orderBy = "sps";
  }


  try {
    const res = await slotStatClientInstance().request({
      url: `/api/Game/aggregated?` + ids,
      method: "GET",
      params: {
        keyWord: keyWord || null,
        ord: orderBy || null,
        direction: direction || null,
        isCrypto: isFiat === "false" ? true : null,
        isFiat: isFiat === "true" ? true : null,
        pageSize: 50,
        page: page || 1,
      },
    });

    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't successfully fetch data");
  }
}
