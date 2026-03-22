"use client";
import axios from "axios";
import { getCookie } from "cookies-next";

const slotStatClientInstance = (bURL?: string) => {
  const uniqueId = getCookie("uniqueId");
  const cookie = getCookie("NEXT_LOCALE");

  const country = getCookie("country");
  const region = getCookie("region");

  const lang = cookie === "en" ? "en-US" : "ka-GE";
  return axios.create({
    // No baseURL — requests use relative paths so they go through the Next.js proxy
    // (avoids CORS: browser never talks directly to api.slotstat.net)
    baseURL: bURL || "",
    // timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
      "X-User-ID": uniqueId,
      country: country,
      region: region,
    },
  });
};

export default slotStatClientInstance;
