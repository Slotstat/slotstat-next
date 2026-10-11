import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseUrl } from "./baseURL";

// The backend sits behind Cloudflare, which answers 403 (managed challenge)
// when several requests from the same server arrive within a few
// milliseconds of each other, and keeps blocking that server for a while
// afterwards. Every server-side backend call therefore goes through this
// module, which
//   1. spaces request starts at least MIN_GAP_MS apart,
//   2. de-duplicates and briefly caches identical GETs, and
//   3. retries a blocked/failed request a couple of times.
const MIN_GAP_MS = 150;
const CACHE_TTL_MS = 60_000;
const CACHE_MAX_ENTRIES = 500;
const RETRY_DELAYS_MS = [500, 1500];
const RETRY_STATUSES = new Set([403, 408, 429, 500, 502, 503, 504]);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let gate: Promise<void> = Promise.resolve();
let lastStart = 0;

// Resolves when the caller may start its request. Only request *starts* are
// spaced; requests are not forced to wait for each other to finish.
function waitForSlot(): Promise<void> {
  gate = gate.then(async () => {
    const wait = lastStart + MIN_GAP_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastStart = Date.now();
  });
  return gate;
}

const cache = new Map<string, { expires: number; response: Promise<AxiosResponse> }>();

const http = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Vercel-Worker-Client",
  },
});

async function send(config: AxiosRequestConfig): Promise<AxiosResponse> {
  for (let attempt = 0; ; attempt++) {
    await waitForSlot();
    try {
      return await http.request(config);
    } catch (error: any) {
      const status = error?.response?.status;
      const retryable = status === undefined || RETRY_STATUSES.has(status);
      if (!retryable || attempt >= RETRY_DELAYS_MS.length) throw error;
      await sleep(RETRY_DELAYS_MS[attempt]);
    }
  }
}

function request(lang: string, config: AxiosRequestConfig): Promise<AxiosResponse> {
  const merged: AxiosRequestConfig = {
    ...config,
    headers: { "Accept-Language": lang, ...(config.headers as Record<string, string>) },
  };
  const method = (merged.method ?? "GET").toUpperCase();
  if (method !== "GET") return send(merged);

  const key = `${lang} ${merged.url} ${JSON.stringify(merged.params ?? {})}`;
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expires > now) return hit.response;

  const response = send(merged);
  if (cache.size >= CACHE_MAX_ENTRIES) cache.clear();
  cache.set(key, { expires: now + CACHE_TTL_MS, response });
  // Never keep a failure around.
  response.catch(() => {
    if (cache.get(key)?.response === response) cache.delete(key);
  });
  return response;
}

const slotStatClient = (locale?: string) => {
  const langMap: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
    pt: "pt-PT",
  };
  const lang = langMap[locale ?? "en"] ?? "en-US";

  return {
    request: <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
      request(lang, config) as Promise<AxiosResponse<T>>,
  };
};

export default slotStatClient;
