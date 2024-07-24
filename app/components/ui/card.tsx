"use client";
import { urlFor } from "@/lib/sanity";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

function Card({ post }: { post: simpleBlogCard }) {
  const pathname = usePathname();

  const { title, smallDescription, currentSlug, titleImage, _createdAt } = post;
  return (
    <Link href={`${pathname}/${currentSlug}`}>
      <div className="max-w-sm rounded-xl overflow-hidden hover:opacity-60 mb-12  bg-dark2 ">
        <div className="relative w-full h-[152px]">
          <Image
            src={urlFor(titleImage).url()}
            alt="image"
            fill
            className="rounded-t-xl object-cover"
          />
        </div>

        <div className="mt-4 mx-4 ">
          <h2 className="font-bold text-white text-xl truncate mb-3">
            {title}
          </h2>
          <h3 className="text-grey1 text-base h-18 line-clamp-3 mb-4">
            {smallDescription}
          </h3>
          <p className="text-white text-base mb-6 ">
            {moment(_createdAt).format("DD MMM. YYYY")}
          </p>
        </div>
        {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div> */}
      </div>
    </Link>
  );
}

export default Card;
