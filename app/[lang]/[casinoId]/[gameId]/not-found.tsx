"use client"; // Error components must be Client components
import Error404 from "@/app/components/Error404";
import { useEffect } from "react";

export default function NotFound({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  //  // Log the error to an error reporting service
  // useEffect(() => {
  //   console.error(error);
  // }, [error]);

  return <Error404 reset={reset} />;
}
