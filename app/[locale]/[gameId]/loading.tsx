import LoadingSkeleton from "@/app/components/LoadingSkeleton";

export default function Loading() {
  return (
    <>
    <div className=" h-24 w-24 bg-red"></div>
      <LoadingSkeleton />
    </>
  );
}
