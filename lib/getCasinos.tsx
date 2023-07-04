import slotStatClient from "./instance";

export default async function getCasinos({
  orderBy,
  keyWord,
  direction,
}: QueryParams) {
  try {
    const res = await slotStatClient.request({
      url: "/api/casino/aggregated",
      method: "GET",
      params: {
        direction,
        orderBy,
        keyWord,
      },
    });
    if (res.status != 200) throw new Error("failed to fetch");
    return res.data;
  } catch (error) {
    return false;
  }
}
