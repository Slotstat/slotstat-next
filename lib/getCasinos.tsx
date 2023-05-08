import slotStatClient from "./instance";

export default async function getCasinos({
  orderBy,
  keyWord,
  direction,
}: QueryParams) {
  const res = await slotStatClient.request({
    url: "/api/casino/aggregateda",
    method: "GET",
    params: {
      direction: direction,
      orderBy,
      keyWord,
    },
  });

  if (res.status != 200) throw new Error("failed to fetch");

  return res.data;
}
