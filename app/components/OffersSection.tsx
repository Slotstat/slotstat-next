"use client";

import Image from "next/image";

export default function OffersSection({ offers }: { offers: Offer[] }) {
  return (
    <section className="my-4 md:my-6">
      <h2 className="text-white text-base md:text-xl font-bold mb-3">
        Featured Offers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {offers.map((offer) => {
          const hasValidImage =
            offer.imageUrl &&
            offer.imageUrl !== "null" &&
            offer.imageUrl !== "" &&
            (offer.imageUrl.startsWith("http://") ||
              offer.imageUrl.startsWith("https://"));

          return (
            <a
              key={offer.offerId}
              href={offer.redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl bg-dark2 overflow-hidden hover:ring-1 hover:ring-blue1 transition-all"
            >
              {hasValidImage && (
                <div className="relative w-full h-32 md:h-40">
                  <Image
                    src={offer.imageUrl}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-3 md:p-4">
                <h3 className="text-white text-sm md:text-base font-bold mb-1 group-hover:text-blue1 transition-colors">
                  {offer.title}
                </h3>
                {offer.subTitle && (
                  <p className="text-grey1 text-xs md:text-sm line-clamp-2">
                    {offer.subTitle}
                  </p>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
