"use client";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next-intl/client";

export default function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setQueryParams(param: QueryParams, pathNameForCasinoStat?: string) {
    const urlSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(param).forEach(([key, value]) => {
      if (!value) {
        return urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, value);
      }
    });

    const filter = urlSearchParams.toString();

    const query = filter ? `?${filter}` : "";
    console.log("222");
    router.push(
      `${pathNameForCasinoStat ? pathNameForCasinoStat : pathname}${query}`
    );
  }

  return { setQueryParams };
}
