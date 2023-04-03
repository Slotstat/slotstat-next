"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { Breadcrumbs as MTBreadcrumbs } from "@material-tailwind/react";
import ForwardIcon from "../assets/svg/ForwardIcon";

// TODO correct Breadcrumbs linking
export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();

  if (segments.length < 1) {
    return null;
  }
  return (
    <div className="relative my-4 px-4 lg:my-6 lg:px-18">
      <MTBreadcrumbs
        className="bg-transparent p-0"
        separator={<ForwardIcon color="#FFFFFF66" size={18} />}
      >
        <Link href="/" className={"text-opaque1"}>
          Home
        </Link>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          return (
            <Link
              key={index}
              href={segment}
              className={`${isLast ? "text-white" : "text-opaque1"}`}
            >
              {segment}
            </Link>
          );
        })}
      </MTBreadcrumbs>
    </div>
  );
}
