import slotStatClientInstance from "./clientInstance";

export async function getLandingCardsClientSide() {
  try {
    const res = await slotStatClientInstance().request({
      url: `/api/landing/card`,
      method: "GET",
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return res.data;
  } catch (error) {
    return false;
  }
}
export async function getLandingOffersClientSide() {
  try {
    const res = await slotStatClientInstance().request({
      url: `/api/landing/offer`,
      method: "GET",
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return res.data;
  } catch (error) {
    return false;
  }
}
