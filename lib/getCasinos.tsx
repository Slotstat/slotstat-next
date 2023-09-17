import slotStatClient from "./instance";

export default async function getCasinos(
  locale: string | undefined,
  { orderBy, keyWord, direction, isCrypto }: QueryParams
) {
  try {
    const res = await slotStatClient(locale).request({
      url: "/api/casino/aggregated",
      method: "GET",
      params: {
        direction: direction || "desc",
        orderBy,
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
