import slotStatClient from "./instance";

export default async function getCasinoCards(casinoId: string) {
  const res = await slotStatClient.request({
    url: `/api/casino/cards/${casinoId}`,
    method: "GET",
  });

  if (res.statusText != "OK") return undefined;

  return res.data;
}
