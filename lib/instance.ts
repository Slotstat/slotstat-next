//<ROOT>/shared/APIKit.js
import axios from "axios";

export const baseUrl = "https://stagingapi.slotstat.ge";

let slotStatClient = axios.create({
  baseURL: baseUrl,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.interceptors.request.use(
//   async (config) => {
  
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


export default slotStatClient;
