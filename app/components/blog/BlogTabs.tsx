"use client";
import React from "react";
import FiatCryptoButton from "../table/FiatCryptoButton";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";

const categories = [
  { title: "Slots", urlFragment: "slots" },
  { title: "Casinos", urlFragment: "casinos" },
  { title: "Providers", urlFragment: "providers" },
  { title: "News", urlFragment: "news" },
  { title: "Education", urlFragment: "education" },
];

export default function BlogTabs() {
  const pathname = usePathname();
  const segments = pathname.split("/");

  return (
    <div>
      {categories.map((category) => (
        <Link key={category.urlFragment} href={`/blog/${category.urlFragment}`}>
          <FiatCryptoButton
            title={category.title}
            active={segments[3] === category.urlFragment}
            click={(e: { stopPropagation: () => any }) => e.stopPropagation()}
            className={"py-2 text-xs md:ml-3 md:py-3 md:text-base"}
          />
        </Link>
      ))}
    </div>
  );
}
