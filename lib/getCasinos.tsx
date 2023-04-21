import slotStatClient from "./instance";

export default async function getCasinos() {
  const res = await slotStatClient.request({
    url: "/api/casino/aggregated",
    method: "GET",
    data: {
      direction: "asc",
    },
  });

  if (res.status != 200) throw new Error("failed to fetch");

  return res.data;
}
