"use client";
import slotStatClientInstance from "./clientInstance";

export default async function getGameListClientSide({
  keyWord,
  direction,
  orderBy,
  isFiat,
}: QueryParams) {
  try {
    const res = await slotStatClientInstance().request({
      url: `/api/Game/aggregated`,
      method: "GET",
      params: {
        keyWord,
        direction: direction || "desc",
        ord: orderBy,
        isCrypto: isFiat === "true" ? false : true,
      },
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't successfully fetch data");
  }
}
