"use client";
import slotStatClientInstance from "./clientInstance";

const BURL = "https://stagingapi.slotstat.net";

export default async function getNewListing() {
  try {
    const res = await slotStatClientInstance(BURL).request({
      url: "/api/Game/aggregated",
      method: "GET",
      params: { pageSize: 50, page: 1, direction: "desc", },
    });

    if (res.status != 200) throw new Error("failed to fetch");
    return res.data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
    return false;
  }
}
