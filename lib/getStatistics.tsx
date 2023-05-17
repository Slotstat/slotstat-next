import slotStatClient from "./instance";

export default async function getStatistics(
  gameId: string,
  activeFilterId: string,
  timeStamp?: number
) {
  const res = await slotStatClient.request({
    url: `/api/statistic/game/${gameId}?interval=_${activeFilterId}`,
    method: "GET",
    params: {
      interval: `_${activeFilterId}`,
      timeStamp,
      // rowCount: 100,
    },
  });
  if (res.status != 200) throw new Error("failed to fetch");

  return res.data;
}
