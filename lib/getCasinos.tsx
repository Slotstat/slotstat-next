import slotStatClient from "./instance";

export default async function getCasinos({
  orderBy,
  keyWord,
  direction,
  isCrypto,
}: QueryParams) {
  try {
    const res = await slotStatClient().request({
      url: "/api/casino/aggregated",
      method: "GET",
      params: {
        direction,
        orderBy: orderBy || "asc",
        keyWord,
        isCrypto: isCrypto === "true" ? true : false,
      },
    });
    if (res.status != 200) throw new Error("failed to fetch");
    return res.data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
    return false;
  }
}
