"use client";
import slotStatClientInstance from "./clientInstance";

// const BURL = "https://stagingapi.slotstat.net";

export default async function getGameListClientSide({
  keyWord,
  direction,
  orderBy,
  isFiat,
  page,
  ids,
}: QueryParams) {
  let statisticsType = null;
  if (
    orderBy === "slotInLoseR" ||
    orderBy === "fixedRtp" ||
    orderBy === "slotInLose" ||
    orderBy === "spsH"
  ) {
    direction = "desc";
  } else if (orderBy === "slotInWinR" || orderBy === "slotInWin" || orderBy === "spsL") {
    direction = "asc";
  }

  if (orderBy === "slotInWinR" || orderBy === "slotInLoseR") {
    orderBy = "rtpState";
  } else if (orderBy === "slotInWin" || orderBy === "slotInLose") {
    orderBy = "currencRtp";
  } else if (orderBy === "spsL" || orderBy === "spsH") {
    orderBy = "sps";
  } else if (orderBy === "AlogrithmDriven" || orderBy === "ApiDriven") {
    statisticsType = orderBy;
    orderBy = null;
  }

  try {
    const res = await slotStatClientInstance().request({
      // url: `/api/Game/aggregated?` + ids,
      url: "/api/Game/aggregated",
      method: "GET",
      params: {
        keyWord: keyWord || null,
        ord: orderBy || null,
        direction: direction || null,
        isCrypto: isFiat === "false" ? true : null,
        isFiat: isFiat === "true" ? true : null,
        pageSize: 50,
        page: page || 1,
        statisticsType: statisticsType || null,
      },
    });

    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't successfully fetch data");
  }
}
