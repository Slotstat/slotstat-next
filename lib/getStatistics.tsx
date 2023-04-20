import slotStatClient from "./instance";

export default async function getStatistics(
  gameId: string,
  activeFilterId: string
) {
  const res = await slotStatClient.request({
    url: `/api/statistic/game/${gameId}?interval=_${activeFilterId}`,
    method: "GET",
  });
  if (res.statusText != "OK") throw new Error("failed to fetch");

  return res.data;
}
