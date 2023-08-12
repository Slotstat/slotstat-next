"use client";
import slotStatClientInstance from "./clientInstance";

export default async function getCasinosClientSide({
  orderBy,
  keyWord,
  direction,
}: QueryParams) {
  try {
    const res = await slotStatClientInstance().request({
      url: "/api/casino/aggregated",
      method: "GET",
      params: {
        direction: direction || "desc",
        orderBy,
        keyWord,
      },
    });
    if (res.status != 200) throw new Error("failed to fetch");
    return res.data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
    return false;
  }
}
