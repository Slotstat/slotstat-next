"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { baseUrl } from "../baseURL";

const slotStatClientInstance = () => {
  const uniqueId = getCookie("uniqueId");
  const cookie = getCookie("NEXT_LOCALE");

  const country = getCookie("country");
  const region = getCookie("region");


  const lang = cookie === "en" ? "en-US" : "ka-GE";
  return axios.create({
    baseURL: baseUrl,
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
