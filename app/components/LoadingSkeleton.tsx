import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSkeleton() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <section>
        <Skeleton count={1} className="h-20 mb-5" />
        <Skeleton count={1} className="h-20 mb-5" />
        <Skeleton count={1} className="h-20 mb-5" />
        <Skeleton count={1} className="h-24 mb-5" />
        <Skeleton count={1} className="h-80 mb-5" />
      </section>
    </SkeletonTheme>
  );
}
