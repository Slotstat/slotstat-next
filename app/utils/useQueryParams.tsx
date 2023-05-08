"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);

  function setQueryParams(param: QueryParams) {
    Object.entries(param).forEach(([key, value]) => {
      if (!value) {
        return urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, value);
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  return { setQueryParams };
}
