"use client"; // Error components must be Client components
import { useEffect } from "react";
import Error404 from "../components/Error404";

export default function Error({
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
