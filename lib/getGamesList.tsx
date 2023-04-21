import slotStatClient from "./instance";

export default async function getGamesList(casinoId: string) {
  const res = await slotStatClient.request({
    url: `/api/Game/aggregated/${casinoId}`,
    method: "GET",
    data: {
      direction: "asc",
    },
  });

  if (res.status != 200) throw new Error("Can't successfully fetch data");

  return res.data;
}
