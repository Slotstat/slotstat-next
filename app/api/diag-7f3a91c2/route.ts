// TEMPORARY diagnostic endpoint: reports how the backend answers when called
// from the Vercel runtime. Remove once the production fetch issue is resolved.
import { NextRequest, NextResponse } from "next/server";
import slotStatClient from "@/lib/instance";

export const dynamic = "force-dynamic";

const GAME = "7d9e7ee5-dacf-45c3-b99b-b138b8638940";
const CASINO = "aad504fd-1b54-4f4e-921c-53c92392a52f";
const SINGLE = `/api/Game/aggregated/single/${GAME}`;
const CCARDS = `/api/casino/cards/${CASINO}`;

const t0 = () => Date.now();
const call = async (path: string, start: number) => {
  const began = t0() - start;
  try {
    const r = await slotStatClient("en").request({ url: path, method: "GET", timeout: 15000, validateStatus: () => true });
    return `${r.status}@${began}-${t0() - start}ms${r.headers["retry-after"] ? " ra=" + r.headers["retry-after"] : ""}`;
  } catch (e: any) {
    return `${e?.code ?? "ERR"}@${began}`;
  }
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("m") ?? "seq";
  const n = Math.min(Number(req.nextUrl.searchParams.get("n") ?? 3), 12);
  const gap = Number(req.nextUrl.searchParams.get("gap") ?? 0);
  const path = req.nextUrl.searchParams.get("p") === "single" ? SINGLE : CCARDS;
  const start = t0();
  const out: any = { region: process.env.VERCEL_REGION, mode, n, gap, results: [] };

  if (mode === "seq") {
    for (let i = 0; i < n; i++) {
      out.results.push(await call(path, start));
      if (gap) await sleep(gap);
    }
  } else if (mode === "stagger") {
    // overlapping requests, each started `gap` ms after the previous one
    const ps: Promise<string>[] = [];
    for (let i = 0; i < n; i++) {
      ps.push(call(path, start));
      await sleep(gap);
    }
    out.results = await Promise.all(ps);
  } else if (mode === "par") {
    out.results = await Promise.all(Array.from({ length: n }, () => call(path, start)));
  }
  return NextResponse.json(out, { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
}
