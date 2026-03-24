interface ProviderInfo {
  about: string;
  notableGames: string[];
}

const descriptions: Record<string, ProviderInfo> = {
  "Pragmatic Play": {
    about:
      "Pragmatic Play is one of the most prolific slot developers in the industry, releasing over 250 HTML5 titles since 2015. Known for high-volatility mechanics such as Money Respin and Power Jackpot, their games are available across hundreds of online casinos worldwide.",
    notableGames: ["Gates of Olympus", "Sweet Bonanza", "The Dog House"],
  },
  "NetEnt": {
    about:
      "A Swedish pioneer of online slots founded in 1996, NetEnt (now part of Evolution Group) set the standard for video slot quality and consistency. Known for polished visuals, Avalanche reels, and reliably high RTP rates, NetEnt games remain among the most widely distributed in the industry.",
    notableGames: ["Starburst", "Gonzo's Quest", "Dead or Alive 2"],
  },
  "Play'n GO": {
    about:
      "Founded in Sweden in 1997, Play'n GO is one of the longest-standing independent slot studios. Their portfolio spans over 300 titles with a focus on storytelling, distinctive art direction, and high-variance mechanics particularly popular in European regulated markets.",
    notableGames: ["Book of Dead", "Fire Joker", "Reactoonz"],
  },
  "Microgaming": {
    about:
      "Widely credited with producing the first true online casino software in 1994, Microgaming pioneered the progressive jackpot slot with Mega Moolah — which holds multiple world records for largest online payouts. Their vast library spans classic 3-reel games to modern video slots.",
    notableGames: ["Mega Moolah", "Immortal Romance", "Thunderstruck II"],
  },
  "Hacksaw Gaming": {
    about:
      "A young Swedish studio founded in 2018, Hacksaw Gaming quickly built a reputation with Buy Bonus features and extreme high-variance mechanics. Their games became viral hits in the streaming community, showcasing a focus on big-win potential and bold visual design.",
    notableGames: ["Wanted Dead or a Wild", "Stick'Em", "Chaos Crew"],
  },
  "Nolimit City": {
    about:
      "A Swedish studio known for pushing volatility to the extreme with their xMechanics series — xBomb, xWays, and xNudge. Founded in 2014 and acquired by Evolution in 2022, Nolimit City titles are favoured by high-stakes players for their uncapped win potential.",
    notableGames: ["San Quentin", "Mental", "Tombstone RIP"],
  },
  "NoLimit City": {
    about:
      "A Swedish studio known for pushing volatility to the extreme with their xMechanics series — xBomb, xWays, and xNudge. Founded in 2014 and acquired by Evolution in 2022, NoLimit City titles are favoured by high-stakes players for their uncapped win potential.",
    notableGames: ["San Quentin", "Mental", "Tombstone RIP"],
  },
  "Push Gaming": {
    about:
      "A UK-based developer founded in 2010, Push Gaming is known for innovative grid mechanics and a strong emphasis on player-friendly RTP. Their games often combine high hit frequencies with large max win potential, earning a loyal following among recreational and bonus hunters alike.",
    notableGames: ["Jammin' Jars", "Fat Banker", "Joker Troupe"],
  },
  "Relax Gaming": {
    about:
      "Founded in 2010, Relax Gaming operates as both a slot developer and a B2B aggregation platform. As a studio they are known for high-quality, high-volatility titles with large max win potential, and their Silver Bullet platform distributes third-party content across the industry.",
    notableGames: ["Money Train 2", "Dead Man's Trail", "Snake Arena"],
  },
  "Red Tiger": {
    about:
      "A UK-based developer founded in 2014 and now part of the Evolution Group, Red Tiger is known for daily jackpot mechanics and timed jackpot drops. Their portfolio blends Asian-themed titles with Megaways licences and progressive jackpot networks popular in European markets.",
    notableGames: ["Gonzo's Quest Megaways", "Dragon's Luck", "Zeus Lightning"],
  },
  "Quickspin": {
    about:
      "A Swedish studio founded in 2011 and acquired by Playtech in 2016, Quickspin focuses on premium slot experiences with strong narratives and smooth gameplay. Their games are recognised for rewarding bonus features, high production values, and above-average RTP rates.",
    notableGames: ["Big Bad Wolf", "Sakura Fortune", "Troll Hunters"],
  },
  "Thunderkick": {
    about:
      "An independent Swedish studio founded in 2012, Thunderkick is known for unconventional math models, quirky art styles, and mechanics that deliberately break from industry norms. Their games have earned a dedicated following among players who seek unique experiences over conventional slot formats.",
    notableGames: ["Pink Elephants", "Fruit Warp", "Urartu"],
  },
  "Big Time Gaming": {
    about:
      "The Australian studio behind the Megaways™ mechanic — a reel modifier now licensed by hundreds of developers worldwide. BTG's Bonanza Megaways remains one of the most-played online slots ever made, and their titles consistently rank among the highest max-win games in the industry.",
    notableGames: ["Bonanza Megaways", "White Rabbit", "Extra Chilli"],
  },
  "Yggdrasil": {
    about:
      "A Maltese developer founded in 2013, Yggdrasil is known for GATI technology and innovative promotional tools for casino operators. Their titles blend strong visual quality with unique bonus mechanics, earning recognition in multiple industry award categories.",
    notableGames: ["Joker Millions", "Vikings Go Berzerk", "Golden Fish Tank"],
  },
  "ELK Studios": {
    about:
      "A Swedish studio founded in 2012, ELK Studios introduced in-game betting strategies and is known for mathematically complex games with distinctive visual art direction. Their games target engaged players looking for depth beyond the standard spin-and-win experience.",
    notableGames: ["Wild Toro", "Sam on the Beach", "Ecuador Gold"],
  },
  "Betsoft": {
    about:
      "One of the earliest adopters of 3D-rendered slot cinematics, Betsoft has produced visually distinctive titles since 2006. Their Slots3 series pioneered story-driven gameplay with cinematic bonus rounds, building a loyal audience among players who value presentation alongside mechanics.",
    notableGames: ["Take the Bank", "Stampede", "Good Girl Bad Girl"],
  },
  "Blueprint Gaming": {
    about:
      "A UK-based developer founded in 2008 and owned by the Gauselmann Group, Blueprint is known for branded licensed games and the Jackpot King progressive network. Their titles are particularly popular in the UK market, spanning licenced IP, Megaways variants, and original concepts.",
    notableGames: ["Eye of Horus", "Ted", "Fishin' Frenzy"],
  },
  "iSoftBet": {
    about:
      "A developer and aggregation platform founded in 2010 and acquired by IGT in 2022, iSoftBet offers both original slots and a platform for distributing third-party content. Known for Gamble and Booster features, they hold a wide portfolio of licensed and original game titles.",
    notableGames: ["Cash Patrol", "Wheel of Wishes", "Gold Digger"],
  },
  "PG Soft": {
    about:
      "A Singapore-based developer founded in 2015, PG Soft has rapidly grown in Asian and global markets with mobile-first HTML5 titles. Their games feature unique win mechanics and high mobile optimisation, making them a favourite across Asian-facing and crypto casino platforms.",
    notableGames: ["Mahjong Ways", "Treasures of Aztec", "Leprechaun Riches"],
  },
  "Wazdan": {
    about:
      "A Malta-based developer founded in 2010, Wazdan is known for the Volatility Levels™ feature that lets players adjust game variance in real time. Their portfolio spans 200+ games with a strong focus on classic fruit machine aesthetics updated for modern audiences.",
    notableGames: ["Magic Stars", "Hot Slot 777 Rubies", "Sizzling 777 Deluxe"],
  },
  "Spinomenal": {
    about:
      "An Israeli developer founded in 2014, Spinomenal produces a high volume of slot titles with a strong focus on the Book mechanic — expanding symbol bonus rounds popularised by Book of Dead. Their games are widely distributed through aggregation platforms across regulated European markets.",
    notableGames: ["Book of Myths", "Rise of Olympus", "Legacy of the Tiger"],
  },
  "BGaming": {
    about:
      "A developer with roots in Softswiss (active since 2012), BGaming is known for provably fair technology and strong adoption in Bitcoin and crypto casinos. Their modern visual style, high RTP rates, and frequent new releases have made them a growing presence across both crypto and fiat platforms.",
    notableGames: ["Elvis Frog in Vegas", "Bonk", "Book of Cats"],
  },
  "Stakelogic": {
    about:
      "A Dutch developer founded in 2015, Stakelogic is known for the Super Stake feature that doubles the bet in exchange for an enhanced chance to trigger the bonus round. Their portfolio spans classic fruit machines through to volatile feature-rich video slots.",
    notableGames: ["Burning Stars", "Book of Adventure", "Golden Joker"],
  },
  "Kalamba Games": {
    about:
      "A Malta-based studio founded in 2017, Kalamba Games specialises in innovative mechanics like Hyperspins (individual reel re-spins) and Cashpots (progressive prize buckets). Their games combine familiar base mechanics with fresh features targeting regulated European and UK markets.",
    notableGames: ["Books & Bulls", "Blazing Bull", "Joker Karts"],
  },
  "Evolution": {
    about:
      "Originally founded in 2006 as a live casino specialist, Evolution has grown into the largest B2B gaming provider in the world through acquisitions including NetEnt, Red Tiger, Nolimit City, and Big Time Gaming. Their slot portfolio draws on these studios alongside exclusive titles developed in-house.",
    notableGames: ["Gonzo's Quest Megaways", "San Quentin", "Bonanza Megaways"],
  },
  "Playtech": {
    about:
      "One of the largest publicly listed gambling technology companies, Playtech was founded in 1999 and offers slots, live casino, sports betting, and financial trading platforms. Their slot portfolio includes branded Marvel and DC titles (through historic licences) and the Age of the Gods progressive jackpot series.",
    notableGames: ["Age of the Gods", "Gladiator", "Buffalo Blitz"],
  },
};

export function getProviderInfo(name: string): ProviderInfo | null {
  // Exact match first
  if (descriptions[name]) return descriptions[name];
  // Case-insensitive fallback
  const lower = name.toLowerCase();
  const key = Object.keys(descriptions).find((k) => k.toLowerCase() === lower);
  return key ? descriptions[key] : null;
}
