"use client"

import { useLink } from "@/context/linkProvider"
import { FaArrowRightToBracket } from "react-icons/fa6";
import InputItem from "./Item";
import Select from "./Select";
import QRcode from "./QRcode";
import { FiLink } from "react-icons/fi";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isValidURL } from "@/utils/Validators";
import { encrypt } from "@/lib/crypto";
import { convertToISOString } from "@/utils/Date_Time";
import { generateUuidBasedId, isValidUuidBasedId, PREFIX } from "@/utils/ID_generator";

const CreateLink = () => {
  const { isCreateLinkPopup, setIsCreateLinkPopup } = useLink()

  const [originalUrl, setOriginalUrl] = useState("")
  const [shortenKey, setShortenKey] = useState("")
  const [expiration, setExpiration] = useState("Never")

  useEffect(() => {
    if (originalUrl && isValidURL(originalUrl)) {
      return setShortenKey(generateUuidBasedId().replace(PREFIX, ""))
    }

    setShortenKey("")
  }, [isCreateLinkPopup, originalUrl])

  const handleSubmit = async () => {
    const isValidUrl = isValidURL(originalUrl)
    const isValidCode = isValidUuidBasedId(`${PREFIX}${shortenKey}`)

    if (!isValidUrl) {
      return toast.error("Not a valid URL", { position: "bottom-left" })
    }

    if (!isValidCode) {
      return toast.error("Not a valid short key", { position: "bottom-left" })
    }

    await toast.promise(
      (async () => {
        const response = await fetch("/api/user/create-link", {
          method: "POST",
          body: JSON.stringify({
            url: originalUrl,
            custom_code: encrypt(shortenKey),
            neverExpires: expiration === "Never",
            expiration: expiration !== "Never" ? convertToISOString(expiration) : null
          })
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setOriginalUrl("")
          setExpiration("Never")
          setShortenKey("")
          setIsCreateLinkPopup(false)

          return data.message || "Link created successfully"
        } else {
          throw new Error(data?.message || "Something went wrong while creating the link")
        }
      })(),
      {
        loading: "Inserting link...",
        success: (message) => message,
        error: (err) => err.message || "Unexpected error occurred",
      }
    )



  }

  const handleClosePopup = () => {
    setShortenKey("")
    setExpiration("Never")
    setOriginalUrl("")
    setIsCreateLinkPopup(false)
  }
  return isCreateLinkPopup ? (
    <>
      <div className="max-w-[46rem] w-full fixed right-0 top-0 overflow-hidden h-screen bg-[#03091d] z-50 border-l-2 rounded-tl-2xl rounded-bl-2xl border-[#ffffff21]">
        <div className="w-full h-14 flex items-center px-8 border-b-2 border-[#181f3eeb] text-[#ffffff87] cursor-pointer" onClick={handleClosePopup}>
          <FaArrowRightToBracket size={20} />
        </div>

        <div className="flex flex-col justify-between h-[92%]">

          <div className="w-full h-full px-6 pt-6">
            <div className="flex gap-2 items-center text-lg font-medium">Create New Link</div>

            <InputItem title={"Destination URL"} placeholder={"Add Link"} targetValue={originalUrl} setTargetValue={setOriginalUrl} />
            <InputItem title={"Shorten key"} placeholder={"(optional)"} targetValue={shortenKey} setTargetValue={(value) => console.log(value)} textBeforeInput siderounded disabled />

            <div className="mt-8 flex flex-col gap-2">
              <div className="text-[#d2d7df] font-medium text-[15px]">Expiration</div>
              <Select selected={expiration} setSelected={setExpiration} />
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <div className="text-[#d2d7df] font-medium text-[15px]">QR Code</div>
              <QRcode originalUrl={originalUrl} />
            </div>

          </div>

          <div className="w-full flex justify-end px-6">
            <motion.div
              className="bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)] border border-[#1d2753] cursor-pointer rounded-md py-1.5 px-3 flex gap-3 items-center w-max"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSubmit}
            >
              <span><FiLink /></span>Create New Link
            </motion.div>
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