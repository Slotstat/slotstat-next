import slotStatClient from "./instance";

export default async function getCasino(casinoId: string) {
  const res = await slotStatClient.request({
    url: `/api/casino/aggregated/${casinoId}`,
    method: "GET",
  });

  if (res.statusText != "OK") return undefined;

  return res.data;
}
