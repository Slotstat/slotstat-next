import slotStatClient from "./instance";

export default async function getLandingCards() {
  const res = await slotStatClient.request({
    url: `/api/landing/card`,
    method: "GET",
  });

  if (res.status != 200) throw new Error("Can't successfully fetch data");

  return res.data;
}
