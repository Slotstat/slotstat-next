import axios from "axios";
import { getCookie } from "cookies-next";

export default async function getGameListClientSide(
  casinoId: string,
  { keyWord, direction, orderBy }: QueryParams
) {
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
  try {
    const res = await slotStatClientInstance.request({
      url: `/api/Game/aggregated/${casinoId}`,
      method: "GET",
      params: {
        keyWord,
        direction,
        orderBy,
      },
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't successfully fetch data");
  }
}
