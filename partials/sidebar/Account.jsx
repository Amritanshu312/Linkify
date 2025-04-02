import { useAuth } from "@/context/authProvider"
import { useSession } from "next-auth/react"
import { BsThreeDots } from "react-icons/bs"

const Account = () => {
  const { session, status, userInfo, fetchLoading } = useAuth()

  return (session && status === "authenticated") ? <div className="flex justify-between px-2 py-3 border-2 border-[#2e3449be] hover:border-[#2e3449] hover:bg-[#27283762] mt-5 rounded-lg items-center cursor-pointer">
    <div className="flex gap-2 items-center">
      <div className="w-6 h-6 bg-[linear-gradient(180deg,#019d94,#2185e5,#4a63ff,#7f35ff)] rounded-full"></div>
      <div className="text-[#fffd]">{fetchLoading === true ? session?.user?.name : userInfo?.name}</div>
    </div>
    <div><BsThreeDots size={17} /></div>
  </div> : null
}

export default Account