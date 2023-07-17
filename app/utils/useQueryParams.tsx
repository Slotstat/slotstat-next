"use client";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next-intl/client";

export default function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  function setQueryParams(param: QueryParams, pathNameForCasinoStat?: string) {
    Object.entries(param).forEach(([key, value]) => {
      if (!value) {
        return urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, value);
      }
    });

    const filter = urlSearchParams.toString();
    const query = filter ? `?${filter}` : "";

    router.push(
      `${pathNameForCasinoStat ? pathNameForCasinoStat : pathname}${query}`
    );
  }

  return { setQueryParams };
}
