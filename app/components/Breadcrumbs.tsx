import { Link } from "@/navigation";
import ForwardIcon from "@/app/assets/svg/ForwardIcon";

type breadcrumbsType = { name: string; url?: string }[];

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: breadcrumbsType;
}) {
  return (
    <div className="my-4 flex flex-row items-center text-xs lg:text-sm lg:my-6">
      <Link href="/" className={"text-opaque1  mr-2"}>
        Home
      </Link>

      {breadcrumbs.map((item, index) => {
        return (
          <>
            <ForwardIcon color="#FFFFFF66" size={18} />
            {item.url ? (
              <Link
                key={index}
                href={item.url}
                className={`${
                  index === breadcrumbs.length - 1
                    ? "text-white"
                    : "text-opaque1"
                } mx-2`}
              >
                {item.name}
              </Link>
            ) : (
              <p
                key={index}
                className={`${
                  index === breadcrumbs.length - 1
                    ? "text-white"
                    : "text-opaque1"
                } mx-2 cursor-default`}
              >
                {item.name}
              </p>
            )}
          </>
        );
      })}
    </div>
  );
}
