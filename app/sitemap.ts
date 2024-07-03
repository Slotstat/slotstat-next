import { baseUrl } from "@/lib/baseURL";
import axios from "axios";

const getCasinos = async () => {
  try {
    let res = await axios({
      method: "get",
      url: `${baseUrl}/api/casino/aggregated`,
    });

    if (res.status != 200) throw new Error("failed to fetch");
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
const getGames = async (casinoIds: string[]) => {
  try {
    const responseArray = await Promise.all(
      casinoIds.map(async (casinoId) => {
        const response = await axios.get(
          `${baseUrl}/api/Game/aggregated/${casinoId}`
        );

        // Check if the response is successful
        if (response.status !== 200) {
          throw new Error(
            `Failed to fetch "${baseUrl}/api/Game/aggregated/${casinoId}"`
          );
        }

        const gameURL = response.data?.results?.map((gameObject: GameData) =>
          gameObject.gameId === "00000000-0000-0000-0000-000000000000"
            ? `${casinoId}/${gameObject.casinoId}`
            : `${casinoId}/${gameObject.gameId}`
        );

        return gameURL;
      })
    );

    const allGamesIDs = [].concat(...responseArray);
    // example: ['cfd48d01-3d08-47cb-926d-76646d2a4f54GEL/cfd48d01-3d08-47cb-926d-76646d2a4f54GEL', 'cfd48d01-3d08-47cb-926d-76646d2a4f54/62cb4197-3c81-4bec-8a03-2d2626ca2435']
    return allGamesIDs;
  } catch (error) {
    console.log("error", error);
  }
};

export default async function sitemap() {
  const baseUrlSitemap = "https://slotstat.net";

  var casinosIds: string[] = [];
  // const casinosData: CasinoData[] = await getCasinos();
  // const casinosUrls =
  //   casinosData?.map((casino) => {
  //     casinosIds.push(casino.casinoId);
  //     return {
  //       url: `${baseUrlSitemap}/${casino.casinoId}`,
  //       lastModified: new Date(),
  //     };
  //   }) ?? [];

  const allGamesIDs = await getGames(casinosIds);
  const allGamesURLs =
    allGamesIDs?.map((ids: string) => {
      return { url: `${baseUrlSitemap}/${ids}`, lastModified: new Date() };
    }) ?? [];

  return [
    {
      url: baseUrlSitemap,
      lastModified: new Date(),
    },
    {
      url: `${baseUrlSitemap}/faq`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrlSitemap}/about-us`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrlSitemap}/terms-of-use`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrlSitemap}/how-it-works`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrlSitemap}/privacy-policy`,
      lastModified: new Date(),
    },
    // ...casinosUrls,
    ...allGamesURLs,
  ];
}
