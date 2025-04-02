import Logo from "@/components/ui/Logo"
import { PiLinkSimpleBold } from "react-icons/pi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { TbTimelineEvent } from "react-icons/tb";
import { TbWorldWww } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import LinkItem from "./LinkItem";
import UsageInfo from "./UsageInfo";
import Account from "./Account";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-full h-screen max-w-[23rem] bg-[#03091d81] backdrop-blur-[86px] fixed top-0 left-0 border-r-2 border-[#181f3eeb] pt-2 pb-14">
      <div className="all-unset w-full px-4 pb-1.5 border-b-2 border-[#181f3e]">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="px-4 h-full py-8 font-['poppins'] flex flex-col gap-2 text-[#93a7c5]">
          <LinkItem title={"Links"} logo={<PiLinkSimpleBold size={17} />} href="/" active />
          <LinkItem title={"Analytics"} logo={<TbBrandGoogleAnalytics size={17} />} href="/analytics" />
          <LinkItem title={"Events"} logo={<TbTimelineEvent size={17} />} href="/events" />
          <LinkItem title={"Domains"} logo={<TbWorldWww size={17} />} href="/domains" />
        </div>

        <div className="px-4 py-8 font-['poppins'] flex flex-col gap-2 text-[#93a7c5]">
          <LinkItem title={"Settings"} logo={<IoSettingsOutline size={17} />} href="/settings" />
          <LinkItem title={"Support"} logo={<HiOutlineChatBubbleLeftRight size={18} />} href="/support" />

          {/* free plan usage shower */}
          <UsageInfo />

          <Account />
        </div>

      </div>
    </div>
  )
}

export default Sidebar