import Error404 from "@/app/components/Error404";

export const metadata = {
  title: "Page not found | SlotStat",
  description: "The page you are looking for does not exist on SlotStat.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error404 />
      </body>
    </html>
  );
}
