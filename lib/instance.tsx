import axios from "axios";
import { cookies } from "next/headers";
import { baseUrl } from "./baseURL";

const slotStatClient = (locale?: string) => {
  let uniqueId = cookies().get("uniqueId")?.value;

  const cookie = cookies().get("NEXT_LOCALE")?.value;

  let lang = cookie === "en" ? "en-US" : "ka-GE";
  let lang1 = locale === "en" ? "en-US" : locale === "ka" ? "ka-GE" : lang;
  console.log("locale", lang1);

  return axios.create({
    baseURL: baseUrl,
    // timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang1,
      "X-User-ID": uniqueId,
    },
  });
};

export default slotStatClient;
