"use client"

import { useLink } from "@/context/linkProvider"
import { FaArrowRightToBracket } from "react-icons/fa6";
import Item from "./Item";
import Select from "./Select";
import QRcode from "./QRcode";

const CreateLink = () => {
  const { isCreateLinkPopup, setIsCreateLinkPopup } = useLink()

  return isCreateLinkPopup ? (
    <>
      <div className="max-w-[46rem] w-full fixed right-0 top-0 overflow-hidden h-screen bg-[#03091d] z-50 border-l-2 rounded-tl-2xl rounded-bl-2xl border-[#ffffff21]">
        <div className="w-full h-14 flex items-center px-8 border-b-2 border-[#181f3eeb] text-[#ffffff87] cursor-pointer" onClick={() => setIsCreateLinkPopup(false)}>
          <FaArrowRightToBracket size={20} />
        </div>

        <div className="w-full h-full px-6 pt-6">
          <div className="flex gap-2 items-center text-lg font-medium">Create New Link</div>

          <Item destination />
          <Item shorten_key />

          <div className="mt-8 flex flex-col gap-2">
            <div className="text-[#d2d7df] font-medium text-[15px]">Expiration</div>
            <Select />
          </div>

          <div className="mt-8 flex flex-col gap-2">
            <div className="text-[#d2d7df] font-medium text-[15px]">QR Code</div>

            <QRcode />
          </div>




        </div>
      </div>

      {/* <div className="w-full h-full bg-[#00000043] fixed top-0 left-0 " onClick={() => setIsCreateLinkPopup(false)}></div> */}
    </>
  )
    :
    null
}

export default CreateLink