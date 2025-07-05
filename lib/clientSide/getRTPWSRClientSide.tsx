"use client";
import slotStatClientInstance from "./clientInstance";

// const BURL = "https://stagingapi.slotstat.net";

export default async function getRTPWSRClientSide() {
  try {
    const res = await slotStatClientInstance().request({
      url: "/api/statistic/game/rtpwsr/54ba6056-a1f7-4c41-a1b5-2938c788bf07",
      method: "GET",
      params: { count: 13 },
    });

    if (res.status != 200) throw new Error("failed to fetch");
    return res.data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
    return false;
  }
}
