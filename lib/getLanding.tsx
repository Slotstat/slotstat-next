import slotStatClient from "./instance";

export async function getLandingCards(locale: "en" | "ka") {
  try {
    const res = await slotStatClient(locale).request({
      url: `/api/landing/card`,
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return res.data;
  } catch (error) {
    console.error("getLandingCards Error:", error);
    return false;
  }
}
export async function getLandingOffers(locale: "en" | "ka") {
  try {
    const res = await slotStatClient(locale).request({
      url: `/api/landing/offer`,
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (res.status != 200) throw new Error("Can't successfully fetch data");
    return res.data;
  } catch (error) {
    console.error("getLandingOffers Error:", error);
    return false;
  }
}
