"use client"
import { LuChartNoAxesColumn } from "react-icons/lu";
import { FiLink } from "react-icons/fi";
import { MdOutlineTouchApp } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { useAuth } from "@/context/authProvider";
import { useLink } from "@/context/linkProvider";

const Stats = () => {
  const { userInfo } = useAuth()
  const { links } = useLink()

  const total_clicks = userInfo?.totalClicks || 0
  const total_links = links?.totalLinks || 0
  const total_organic_share = userInfo?.totalOrganicShare || 0

  return (
    <div className="flex gap-4 max-[1366px]:grid max-[1366px]:grid-cols-2 max-[1366px]:gap-[5_4] max-[590px]:grid-cols-1 items-center">
      <StatsCard icon={<LuChartNoAxesColumn size={28} />} title={"Total Clicks"} totalValue={total_clicks} />
      <StatsCard icon={<FiLink size={24} />} title={"Links Created"} totalValue={total_links} />
      <StatsCard icon={<MdOutlineTouchApp size={28} />} title={"Organic Share Clicks"} totalValue={total_organic_share} />
      <StatsCard icon={<FaShare size={22} />} title={"Link Creation Allowed"} totalValue={userInfo?.linksAllowed || 40} />
    </div>
  )
}

const StatsCard = ({ icon, title, totalValue }) => {
  return (
    <div className="w-full h-36 rounded-xl flex items-center gap-4 px-5 bg-[linear-gradient(#131a33d4,#0c1227d4,#0c132cd4,#0e152ed4)] border-2 border-[#19203c]">
      <div className="w-14 h-14 flex items-center justify-center border-[#161d3b96] border-2 rounded-2xl">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-medium text-[#e5e7ec]">{title}</div>
        <div className="text-xl font-semibold tracking-wide text-[#a5b5d0]">{totalValue}</div>
      </div>
    </div>
  )
}

export default Stats