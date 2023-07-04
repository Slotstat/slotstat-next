//<ROOT>/shared/APIKit.js
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
// import { cookies } from "next/headers";

export const baseUrl = "https://api.slotstat.ge";

// const hasCookie = cookies().has("NEXT_LOCALE");
// console.log("hasCookie",hasCookie);

let slotStatClient = axios.create({
  baseURL: baseUrl,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // "accept-language": hasCookie,
  },
});

// instance.interceptors.request.use(
//   async (config) => {

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default slotStatClient;
