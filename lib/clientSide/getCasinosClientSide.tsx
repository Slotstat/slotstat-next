import axios from "axios";
import { getCookie } from "cookies-next";

export default async function getCasinosClientSide({
  orderBy,
  keyWord,
  direction,
}: QueryParams) {
  try {
    const cookie = getCookie("NEXT_LOCALE"); // => 'value'
    const lang = cookie === "en" ? "en-US" : "ka-GE";
    const slotStatClientInstance = axios.create({
      baseURL: "https://api.slotstat.ge",
      // timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    });
    const res = await slotStatClientInstance.request({
      url: "/api/casino/aggregated",
      method: "GET",
      params: {
        direction,
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
