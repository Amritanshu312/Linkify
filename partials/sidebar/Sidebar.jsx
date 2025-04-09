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
import { useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import HamburgerButton from "./components/Hamburger";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion"


const Sidebar = () => {
  const [isToggled, setIsToggled] = useState(false)
  const { width } = useWindowSize()

  const containerVariants = {
    hidden: { opacity: 0.5 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.15,
        duration: 0.6,
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    },
    exit: { opacity: 0.5, transition: { duration: 0.3 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  }


  return (
    <motion.div
      key="sidebar"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "h-screen bg-[#03091d81] max-[1400px]:bg-[#03091d00] backdrop-blur-[86px] fixed top-0 left-0 border-r-2 border-[#181f3eeb] pt-2 !pb-0 z-50 overflow-hidden flex flex-col",
        width < 1400 && !isToggled ? "w-20" : "max-w-[23rem] w-full overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      )}
    >
      <motion.div
        className="all-unset w-full h-[71px] border-b-2 border-[#181f3e] flex justify-between items-center px-4 pb-1.5"
        variants={itemVariants}
      >
        {(isToggled || width > 1400) && (
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href={"/"}>
              <Logo />
            </Link>
          </motion.div>
        )}
        {width < 1400 && (
          <HamburgerButton isOpen={isToggled} setIsOpen={setIsToggled} />
        )}
      </motion.div>

      <div className="flex flex-col justify-between h-full">
        <motion.div
          className="px-4 h-full py-8 font-['poppins'] flex flex-col gap-2 text-[#93a7c5]"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <LinkItem title={(!isToggled && width < 1400) ? "" : "Links"} logo={<PiLinkSimpleBold size={18} />} href="/" active />
          </motion.div>
          <motion.div variants={itemVariants}>
            <LinkItem title={(!isToggled && width < 1400) ? "" : "Analytics"} logo={<TbBrandGoogleAnalytics size={18} />} href="/analytics" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <LinkItem title={(!isToggled && width < 1400) ? "" : "Events"} logo={<TbTimelineEvent size={18} />} href="/events" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <LinkItem title={(!isToggled && width < 1400) ? "" : "Domains"} logo={<TbWorldWww size={18} />} href="/domains" />
          </motion.div>
        </motion.div>

        <motion.div
          className="px-4 py-8 pb-2 font-['poppins'] flex flex-col gap-2 text-[#93a7c5]"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <LinkItem title={(!isToggled && width < 1400) ? "" : "Settings"} logo={<IoSettingsOutline size={18} />} href="/settings" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <LinkItem title={(!isToggled && width < 1400) ? "" : "Support"} logo={<HiOutlineChatBubbleLeftRight size={19} />} href="/support" />
          </motion.div>

          {(isToggled || width > 1400) && (
            <motion.div variants={itemVariants}>
              <UsageInfo />
            </motion.div>
          )}
          <motion.div variants={itemVariants}>
            <Account onlyProfile={isToggled || width > 1400} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Sidebar