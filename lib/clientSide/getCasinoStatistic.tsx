"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { baseUrl } from "../baseURL";
import slotStatClientInstance from "./clientInstance";

export default async function getCasinoStatistic(
    casinoId: string,
  activeFilterId: string,
  timeStamp?: number
) {

  
  const res = await slotStatClientInstance().request({
    url: `/api/statistic/casino/range/${casinoId}?`,
    method: "GET",
    params: {
      timeStamp,
      timeInterval: `_${activeFilterId}`,
    },
  });
  if (res.status != 200) throw new Error("failed to fetch");

  return res.data;
}
