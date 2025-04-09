import PagesInfoHeader from "@/components/layout/PagesInfoHeader";
import Home from "@/pages/home/Home";



export default async function HomePage() {

  return (
    <div className="min-h-screen flex flex-col">
      <PagesInfoHeader />

      <div className="w-full px-3.5 py-3">
        <Home />
      </div>
      
    </div>
  );
}
