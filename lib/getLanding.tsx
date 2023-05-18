import slotStatClient from "./instance";

export async function getLandingCards() {
  try {
    const res = await slotStatClient.request({
      url: `/api/landing/card`,
      method: "GET",
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return res.data;
  } catch (error) {
    // console.log(error);
    return false;
  }
}
export async function getLandingOffers() {
  try {
    const res = await slotStatClient.request({
      url: `/api/landing/offer`,
      method: "GET",
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return res.data;
  } catch (error) {
    // console.log(error);
    return false;
  }
}
