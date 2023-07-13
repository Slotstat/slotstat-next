import slotStatClient from "./instance";

export default async function getCasino(casinoId: string) {
  const res = await slotStatClient().request({
    url: `/api/casino/aggregated/${casinoId}`,
    method: "GET",
  });

  if (res.status != 200) throw new Error("failed to fetch");

  return res.data;
}
