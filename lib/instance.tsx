import axios from "axios";
import { cookies } from "next/headers";

export const baseUrl = "https://api.slotstat.ge";

const slotStatClient = () => {
  let uniqueId = cookies().get("uniqueId")?.value;

  const cookie = cookies().get("NEXT_LOCALE")?.value;
  let lang = cookie === "en" ? "en-US" : "ka-GE";
  return axios.create({
    baseURL: baseUrl,
    // timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
      "X-User-ID": uniqueId,
    },
  });
};

export default slotStatClient;
