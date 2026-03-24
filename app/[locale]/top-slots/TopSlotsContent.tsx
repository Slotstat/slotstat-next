"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

function GameRow({
  game,
  rank,
  metric,
}: {
  game: GameData;
  rank: number;
  metric: "rtp" | "wsr" | "maxWin";
}) {
  const metricValue =
    metric === "rtp"
      ? `${game.fixedRtp?.toFixed(2) ?? "N/A"}%`
      : metric === "wsr"
        ? `${game.wsr?.toFixed(2) ?? "N/A"}%`
        : `${game.maxX ?? "N/A"}x`;

  const metricColor =
    metric === "rtp"
      ? game.fixedRtp > 96
        ? "text-green-400"
        : "text-yellow-400"
      : metric === "wsr"
        ? game.wsr > 30
          ? "text-green-400"
          : "text-yellow-400"
        : "text-blue-400";

  const hasValidImage =
    game.imageUrl &&
    game.imageUrl !== "null" &&
    game.imageUrl !== "" &&
    (game.imageUrl.startsWith("http://") || game.imageUrl.startsWith("https://"));

  return (
    <Link
      href={`/${game.gameId}`}
      className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-dark2 hover:bg-dark2/80 transition-colors"
    >
      <span className="text-grey1 font-bold text-sm w-6 text-center shrink-0">
        {rank}
      </span>

      <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-grey3 shrink-0">
        {hasValidImage ? (
          <Image
            src={game.imageUrl}
            alt={game.name}
            fill
            className="object-cover"
            sizes="48px"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-grey1 text-xs">
            N/A
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white text-sm md:text-base font-bold truncate">
          {game.name}
        </p>
        <p className="text-grey1 text-xs truncate">
          {game.casinoName} {game.provider ? `| ${game.provider}` : ""}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className={`font-bold text-sm md:text-base ${metricColor}`}>
          {metricValue}
        </p>
        <p className="text-grey1 text-[10px] md:text-xs">
          {metric === "rtp" ? "RTP" : metric === "wsr" ? "WSR" : "Max Win"}
        </p>
      </div>
    </Link>
  );
}

function RankingSection({
  title,
  description,
  games,
  metric,
}: {
  title: string;
  description: string;
  games: GameData[];
  metric: "rtp" | "wsr" | "maxWin";
}) {
  if (games.length === 0) return null;

  return (
    <section className="mb-10 md:mb-14">
      <h2 className="text-xl md:text-2xl font-bold mb-1">{title}</h2>
      <p className="text-grey1 text-sm mb-4">{description}</p>
      <div className="flex flex-col gap-2">
        {games.map((game, idx) => (
          <GameRow
            key={`${metric}-${game.gameId}-${idx}`}
            game={game}
            rank={idx + 1}
            metric={metric}
          />
        ))}
      </div>
    </section>
  );
}

export default function TopSlotsContent({
  highestRtp,
  bestWinRate,
  highestMaxWin,
}: {
  highestRtp: GameData[];
  bestWinRate: GameData[];
  highestMaxWin: GameData[];
}) {
  const t = useTranslations("topSlots");

  return (
    <>
      <RankingSection
        title={t("highestRTP")}
        description="Slots with the best Return to Player percentage right now. Higher RTP means more is returned to players over time."
        games={highestRtp}
        metric="rtp"
      />

      <RankingSection
        title={t("bestWinSpinRate")}
        description="Slots with the highest frequency of winning spins. A higher WSR means more spins result in payouts exceeding your bet."
        games={bestWinRate}
        metric="wsr"
      />

      <RankingSection
        title={t("highestMaxWin")}
        description="Slots with the largest potential payouts relative to your bet size."
        games={highestMaxWin}
        metric="maxWin"
      />

      <div className="mt-8 text-center">
        <p className="text-grey1 text-sm mb-4">
          Want to explore all games with custom filters?
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue1 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          Explore All Slots
        </Link>
      </div>
    </>
  );
}
