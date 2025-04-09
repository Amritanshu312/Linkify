import PagesInfoHeader from "@/components/layout/PagesInfoHeader";
import CreateNewLinks from "@/pages/home/no-links/CreateNewLinks";
import LinksItems from "@/pages/home/no-links/LinksItems";


export default async function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <PagesInfoHeader />

      <div className="w-full px-3.5 py-3">

        <div className="min-[586px]:px-12 min-[586px]:py-6 flex flex-col gap-8 items-center">
          <LinksItems />
          <CreateNewLinks />
        </div>

      </div>
    </div>
  );
}
