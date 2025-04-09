import { cn } from "@/lib/cn"
import Link from "next/link"

const LinkItem = ({
  title,
  logo,
  active,
  href
}) => {
  return (
    <Link href={href} className={cn("flex w-full hover:bg-[#191f3f] hover:text-[#ecececf4] duration-75 cursor-pointer px-2 py-2.5 rounded-lg items-center gap-2", {
      "bg-[#191f3f] text-[#ecececf4] hover:bg-[#232849]": !!active,
      "justify-center items-center": title === ""
    })}>
      <span>{logo}</span>
      {title !== "" && <div>{title}</div>}
    </Link>
  )
}

export default LinkItem