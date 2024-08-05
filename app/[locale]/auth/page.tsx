import AuthComponent from "@/app/components/Authentication/AuthComponent";

export default async function Home({
  params: { category },
}: {
  params: { category: string };
}) {
  return (
    <div className="text-white mt-6 ">
      <AuthComponent />
    </div>
  );
}
