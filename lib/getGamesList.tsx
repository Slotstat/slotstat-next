import slotStatClient from "./instance";

export default async function getGamesList(
  locale: string,

  { keyWord, direction, orderBy, isFiat }: QueryParams
) {
  try {
    const res = await slotStatClient(locale).request({
      url: `/api/Game/aggregated/`,
      method: "GET",
      params: {
        keyWord,
        ord: orderBy,
        direction: direction || "desc",
        isCrypto: isFiat === "true" ? false : true,
        pageSize: 100,
      },
    });

    if (res.status != 200) throw new Error("Can't successfully fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't successfully fetch data");
  }
}
