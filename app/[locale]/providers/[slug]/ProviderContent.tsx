"use client";

import Image from "next/image";
import { Link } from "@/navigation";

function ProviderGameRow({ game }: { game: GameData }) {
  const hasValidImage =
    game.imageUrl &&
    game.imageUrl !== "null" &&
    game.imageUrl !== "" &&
    (game.imageUrl.startsWith("http://") || game.imageUrl.startsWith("https://"));

  const rtpColor =
    game.fixedRtp > 96
      ? "text-green-400"
      : game.fixedRtp > 94
        ? "text-yellow-400"
        : "text-grey1";

  return (
    <Link
      href={`/${game.gameId}`}
      className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-dark2 hover:bg-dark2/80 transition-colors"
    >
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
        <p className="text-grey1 text-xs truncate">{game.casinoName}</p>
      </div>

      <div className="flex gap-3 md:gap-6 shrink-0 text-right">
        <div>
          <p className={`font-bold text-sm ${rtpColor}`}>
            {game.fixedRtp != null ? `${game.fixedRtp.toFixed(2)}%` : "N/A"}
          </p>
          <p className="text-grey1 text-[10px]">RTP</p>
        </div>
        <div className="hidden sm:block">
          <p className="font-bold text-sm text-white">
            {game.wsr != null ? `${game.wsr.toFixed(2)}%` : "N/A"}
          </p>
          <p className="text-grey1 text-[10px]">WSR</p>
        </div>
        <div className="hidden md:block">
          <p className="font-bold text-sm text-blue-400">
            {game.maxX ? `${game.maxX}x` : "N/A"}
          </p>
          <p className="text-grey1 text-[10px]">Max Win</p>
        </div>
      </div>
    </Link>
  );
}

export default function ProviderContent({
  games,
  providerName,
  locale,
}: {
  games: GameData[];
  providerName: string;
  locale: string;
}) {
  if (games.length === 0) {
    return (
      <div className="p-8 rounded-xl bg-dark2 text-center">
        <p className="text-grey1 mb-4">
          No games found for {providerName} right now.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2 bg-blue1 text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm"
        >
          Browse All Slots
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold">
          {games.length} Game{games.length !== 1 ? "s" : ""} Found
        </h2>
        <p className="text-grey1 text-xs">Sorted by highest RTP</p>
      </div>

      <div className="flex flex-col gap-2 mb-10">
        {games.map((game) => (
          <ProviderGameRow key={game.gameId} game={game} />
        ))}
      </div>

      <div className="text-center">
        <p className="text-grey1 text-sm mb-4">
          Want to explore all providers?
        </p>
        <Link
          href={`/${locale}/providers`}
          className="inline-block px-6 py-3 bg-blue1 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          All Providers
        </Link>
      </div>
    </>
  );
}
