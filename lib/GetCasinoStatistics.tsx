import slotStatClient from "./instance";

export default async function getCasinoStatistics(
    casinoId: string,
  activeFilterId: string,
  timeStamp?: number
) {
  const res = await slotStatClient.request({
    url: `/api/statistic/casino/${casinoId}?interval=_${activeFilterId}`,
    method: "GET",
    params: {
      interval: `_${activeFilterId}`,
      timeStamp,
      rowCount: 100,
    },
  });
  if (res.status != 200) throw new Error("failed to fetch");

  return res.data;
}
