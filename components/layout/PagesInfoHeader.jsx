"use client"
import { useLink } from '@/context/linkProvider'
import { create } from 'zustand'

const PagesInfoHeader = ({
  title,
  description
}) => {
  const { setIsCreateLinkPopup } = useLink()

  return (
    <div className="bg-[#03091d81] h-[74px] backdrop-blur-[86px] border-b-2 border-[#181f3eeb] flex justify-between items-center px-4">
      <div className="flex flex-col">
        <div className="font-semibold">Linkify {title || "Links"}</div>
        <p className="text-[#6e73ac] font-['poppins'] text-center">{description || "Create, Share and manage your links."}</p>
      </div>

      <div
        className="bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)] border border-[#181f3eeb] cursor-pointer rounded-md py-1.5 px-3"
        onClick={() => setIsCreateLinkPopup(prev => !prev)}
      >
        Create New Link
      </div>
    </div>
  )
}

export default PagesInfoHeader