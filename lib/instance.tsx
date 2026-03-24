import axios from "axios";
import { baseUrl } from "./baseURL";

const slotStatClient = (locale?: string) => {
  // const uniqueId = cookies().get("uniqueId")?.value;
  // const cookie = cookies().get("NEXT_LOCALE")?.value;

  // const country = cookies().get("country")?.value;
  // const region = cookies().get("region")?.value;

  // let lang = cookie === "en" ? "en-US" : "ka-GE";
  const langMap: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
    pt: "pt-PT",
  };
  const lang1 = langMap[locale ?? "en"] ?? "en-US";

  return axios.create({
    baseURL: baseUrl,
    // timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang1,
      "User-Agent": "Vercel-Worker-Client",
      // "X-User-ID": uniqueId,
      // country: country,
      // region: region,
    },
  });
};

export default slotStatClient;
