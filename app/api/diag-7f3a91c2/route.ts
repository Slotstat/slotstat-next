// TEMPORARY diagnostic endpoint: reports how the backend answers when called
// from the Vercel runtime. Remove once the production fetch issue is resolved.
import { NextResponse } from "next/server";
import axios from "axios";
import slotStatClient from "@/lib/instance";
import { baseUrl } from "@/lib/baseURL";

export const dynamic = "force-dynamic";

const GAME = "7d9e7ee5-dacf-45c3-b99b-b138b8638940";
const CASINO = "aad504fd-1b54-4f4e-921c-53c92392a52f";
const SINGLE = `/api/Game/aggregated/single/${GAME}`;
const GCARDS = `/api/game/cards/${GAME}`;
const CCARDS = `/api/casino/cards/${CASINO}`;
const CBONUS = `/api/casino/bonus/${CASINO}`;

const viaClient = async (path: string) => {
  try {
    const r = await slotStatClient("en").request({ url: path, method: "GET", timeout: 15000, validateStatus: () => true });
    return r.status;
  } catch (e: any) {
    return e?.code ?? "ERR";
  }
};
const viaBare = async (path: string, headers: Record<string, string>) => {
  try {
    const r = await axios({ method: "get", url: `${baseUrl}${path}`, headers, timeout: 15000, validateStatus: () => true });
    return r.status;
  } catch (e: any) {
    return e?.code ?? "ERR";
  }
};
const viaFetch = async (path: string, headers: Record<string, string>) => {
  try {
    const r = await fetch(`${baseUrl}${path}`, { cache: "no-store", headers });
    await r.arrayBuffer();
    return r.status;
  } catch (e: any) {
    return e?.name ?? "ERR";
  }
};

export async function GET() {
  const out: any = { node: process.version, region: process.env.VERCEL_REGION };

  // Same shape as the game page: one call, then three in parallel.
  out.pageShape = [];
  for (let i = 0; i < 4; i++) {
    const single = await viaClient(SINGLE);
    const [g, c, b] = await Promise.all([viaClient(GCARDS), viaClient(CCARDS), viaClient(CBONUS)]);
    out.pageShape.push({ single, gameCards: g, casinoCards: c, casinoBonus: b });
  }

  out.parallel12_casinoCards = await Promise.all(Array.from({ length: 12 }, () => viaClient(CCARDS)));
  out.parallel12_single = await Promise.all(Array.from({ length: 12 }, () => viaClient(SINGLE)));
  out.sequential6_casinoCards = [];
  for (let i = 0; i < 6; i++) out.sequential6_casinoCards.push(await viaClient(CCARDS));

  const UA = { "User-Agent": "Vercel-Worker-Client" };
  out.bareAxios_uaOnly = await viaBare(CCARDS, UA);
  out.bareAxios_noUa = await viaBare(CCARDS, {});
  out.bareAxios_browserUa = await viaBare(CCARDS, { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36" });
  out.fetch_uaOnly = await viaFetch(CCARDS, UA);
  out.fetch_axiosLikeHeaders = await viaFetch(CCARDS, {
    ...UA,
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Accept-Language": "en-US",
    "Accept-Encoding": "gzip, compress, deflate, br",
  });
  out.fetch_noUa = await viaFetch(CCARDS, {});

  return NextResponse.json(out, { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
}
