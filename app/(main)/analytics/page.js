import Stats from "@/contents/analytics/Stats";
import TopSites from "@/contents/analytics/TopSites";
import Link from "next/link";
import { RiGeminiFill } from "react-icons/ri";

const AnalyticsPage = () => {
	return (
		<div className="px-2 py-2 min-[680px]:px-12 min-[680px]:py-6 flex flex-col gap-4 font-['poppins']">
			<Stats />

			<div className="flex gap-4 mt-4">
				<TopSites />

				<div className="w-full">
					<div className="flex justify-between px-2  py-4 w-full rounded-lg">
						<div>Top Organic Share</div>
						<div className="cursor-pointer text-blue-400">Learn More</div>
					</div>

					<div className="flex gap-3 px-4 py-8 rounded-2xl items-center bg-[#0d132c] text-[#0e94a3]">
						<RiGeminiFill size={29} />
						Learn about who's sharing your content by adding a Linkify network domain with an enterprise plan. Upgrade now.
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsPage;
