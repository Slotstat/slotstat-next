// TEMPORARY diagnostic endpoint: reports how the backend answers when called
// from the Vercel runtime. Remove once the production fetch issue is resolved.
import { NextResponse } from "next/server";
import slotStatClient from "@/lib/instance";
import { baseUrl } from "@/lib/baseURL";

export const dynamic = "force-dynamic";

const GAME = "7d9e7ee5-dacf-45c3-b99b-b138b8638940";
const CASINO = "aad504fd-1b54-4f4e-921c-53c92392a52f";
const PATHS = [
  `/api/Game/aggregated/single/${GAME}`,
  `/api/game/cards/${GAME}`,
  `/api/casino/cards/${CASINO}`,
  `/api/casino/bonus/${CASINO}`,
  `/api/landing/card`,
  `/api/landing/offer`,
  `/api/casino`,
  `/api/Game/aggregated/?ord=fixedRtp&direction=desc&pageSize=2`,
];

const pick = (h: any) => ({
  server: h?.["server"],
  "content-type": h?.["content-type"],
  "content-encoding": h?.["content-encoding"],
  "cf-ray": h?.["cf-ray"],
  "cf-mitigated": h?.["cf-mitigated"],
  "retry-after": h?.["retry-after"],
});

export async function GET() {
  const out: any = {
    node: process.version,
    region: process.env.VERCEL_REGION,
    results: [],
  };
  for (const path of PATHS) {
    const row: any = { path };
    try {
      const res = await slotStatClient("en").request({
        url: path,
        method: "GET",
        timeout: 15000,
        validateStatus: () => true,
      });
      row.axios = {
        status: res.status,
        headers: pick(res.headers),
        body: (typeof res.data === "string" ? res.data : JSON.stringify(res.data))?.slice(0, 160),
      };
    } catch (e: any) {
      row.axios = { error: e?.code, message: e?.message, cause: String(e?.cause ?? "") };
    }
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
        headers: { "User-Agent": "Vercel-Worker-Client", "Accept-Language": "en-US" },
      });
      const text = await res.text();
      row.fetch = {
        status: res.status,
        headers: pick(Object.fromEntries(res.headers.entries())),
        body: text.slice(0, 160),
      };
    } catch (e: any) {
      row.fetch = { error: e?.name, message: e?.message, cause: String(e?.cause ?? "") };
    }
    out.results.push(row);
  }
  return NextResponse.json(out, { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
}
