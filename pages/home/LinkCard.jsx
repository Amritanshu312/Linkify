import { BsArrowReturnRight } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { FaPersonRunning } from "react-icons/fa6";
import { PiCursorClick } from "react-icons/pi";
import Link from "next/link";
import { formatDate } from "@/utils/Date_Time";
import { copyToClipboard } from "@/utils/Clipboard";
import { toast } from "sonner";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};


const LinkCard = ({
  data
}) => {

  const HandleCopy = async () => {
    const res = await copyToClipboard(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${data?.short_url}`)

    if (res.success) {
      return toast.success("URL successfully copied to clipboard!");
    }
    return toast.error("Failed to copy the URL. Please try again.");
  }

  return (
    <motion.div
      className="w-full h-full max-h-40 bg-[linear-gradient(#131a33d4,#0c1227d4,#0c132cd4,#0e152ed4)] border-2 border-[#19203c] flex flex-col p-2 px-4 rounded-[6px] gap-2"
      variants={itemVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <div className="w-full justify-between flex items-center h-full border-2 border-[#161d3b75] p-2 rounded-lg">
        <div className="flex gap-3.5">
          <div className="min-w-12 h-12 rounded-full border border-[#242a50] p-2.5">
            <div className="w-full h-full bg-[linear-gradient(#3a2568,#1c1956,#1a244d,#171747)] rounded-full"></div>
          </div>

          <div className="flex gap-2 flex-col">
            <div className="flex gap-3 items-center">
              <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${data?.short_url}`} target="_" className="font-medium">{process.env.NEXT_PUBLIC_WEBSITE_URL.replace("http://", "").replace("https://", "")}/{data?.short_url}</Link>
              <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${data?.short_url}`} target="_" className="cursor-pointer text-[#aeb0b9] hover:text-white"><FiExternalLink size={18} /></Link>
              <div
                className="cursor-pointer text-[#aeb0b9] hover:text-white"
                onClick={HandleCopy}
              ><MdOutlineContentCopy /></div>
            </div>

            <div className="flex items-center gap-2">
              <div><BsArrowReturnRight /></div>
              <Link href={data.url} target="_" className="text-[#93a7c5] hover:text-[#a7bfe2]  text-[15px] cursor-pointer line-clamp-1">{data.url}</Link>
            </div>
          </div>
        </div>

        <div><BsThreeDots /></div>
      </div>


      <div className="flex w-full items-center justify-between">

        <div className="flex gap-3 text-[#ffffffd5] text-sm">

          <div className="flex gap-2 items-center border-2 border-[#161d3b] p-1 px-2 rounded-md">
            <div><FaPersonRunning size={18} /></div>
            <div>258 Visitors</div>
          </div>

          <div className="flex gap-2 items-center border-2 border-[#161d3b] p-1 px-2 rounded-md">
            <div><PiCursorClick size={18} /></div>
            <div>{data?.clicks} Clicks</div>
          </div>

        </div>

        <div className="text-[#969ac2ec] text-sm">{formatDate(data?.updatedAt)}</div>
      </div>
    </motion.div>
  )
}

export default LinkCard