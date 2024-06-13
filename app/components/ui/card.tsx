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
      <div className="max-w-sm rounded overflow-hidden hover:opacity-60 mb-12">
        <Image
          src={urlFor(titleImage).url()}
          alt="image"
          width={300}
          height={160}
          className="rounded-t-3xl h-[152px] object-cover"
        />
        <div className="py-6 ">
          <div className="font-bold text-white text-2xl mb-3">{title}</div>
          <p className="text-grey1 text-base h-12 line-clamp-2">{smallDescription}</p>
        </div>
          <p className="text-white text-base">
            {moment(_createdAt).format("DD MMM. YYYY")}
          </p>
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
