"use client";
import slotStatClientInstance from "./clientInstance";

export default async function getSingleGameClientSide(gameId: string) {
  try {
    const res = await slotStatClientInstance().request({
      url: `/api/Game/aggregated/single/${gameId}`,
      method: "GET",
    });
    if (res.status != 200) throw new Error("failed to fetch");
    return res.data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
}
