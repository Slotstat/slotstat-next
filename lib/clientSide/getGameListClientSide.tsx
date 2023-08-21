"use client";
import slotStatClientInstance from "./clientInstance";

export default async function getGameListClientSide(
  casinoId: string,
  { keyWord, direction, orderBy }: QueryParams
) {
  try {
    const res = await slotStatClientInstance().request({
      url: `/api/Game/aggregated/${casinoId}`,
      method: "GET",
      params: {
        keyWord,
        direction: direction || "desc",
        ord: orderBy,
      },
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't successfully fetch data");
  }
}
