import slotStatClient from "./instance";

export async function getLandingCards(locale:string) {
  try {
    const res = await slotStatClient(locale).request({
      url: `/api/landing/card`,
      method: "GET",
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return res.data;
  } catch (error) {
    return false;
  }
}
export async function getLandingOffers(locale:string) {
  try {
    const res = await slotStatClient(locale).request({
      url: `/api/landing/offer`,
      method: "GET",
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return res.data;
  } catch (error) {
    return false;
  }
}
