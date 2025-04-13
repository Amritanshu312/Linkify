"use client"

import { useLink } from "@/context/linkProvider"
import { FaArrowRightToBracket } from "react-icons/fa6";
import InputItem from "./Item";
import Select from "./Select";
import QRcode from "./QRcode";
import { FiLink } from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isValidURL } from "@/utils/Validators";
import { encrypt } from "@/lib/crypto";
import { convertToISOString } from "@/utils/Date_Time";
import { generateUuidBasedId, isValidUuidBasedId, PREFIX } from "@/utils/ID_generator";
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/authProvider";

const CreateLink = () => {
  const { isCreateLinkPopup, setIsCreateLinkPopup, links } = useLink()
  const { userInfo } = useAuth()

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
    toast.info("Creating your link now...", { position: "bottom-left" })

    const isValidUrl = isValidURL(originalUrl)
    const isValidCode = isValidUuidBasedId(`${PREFIX}${shortenKey}`)

    if (!isValidUrl) {
      return toast.error("Not a valid URL", { position: "bottom-left" })
    }

    if (!isValidCode) {
      return toast.error("Not a valid short key", { position: "bottom-left" })
    }

    if (userInfo?.linksAllowed > 0 && links?.totalLinks >= userInfo?.linksAllowed) {
      return toast.error("Link Creation Exceeded", { position: "bottom-left" })
    }

    if (userInfo?.maxClicks > 0 && userInfo?.totalClicks >= userInfo?.maxClicks) {
      return toast.error("Clicks Exceeded", { position: "bottom-left" })
    }

    toast.promise(
      (async () => {
        const response = await fetch("/api/user/links/create", {
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
        position: "bottom-left",
        success: (message) => message,
        error: (err) => err.message || "Unexpected error occurred",
      }
    )
  }
  const popupVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 14,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: {
      opacity: 1,
      backdropFilter: "blur(6px)",
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.2 },
    },
  };

  const handleClosePopup = () => {
    setShortenKey("")
    setExpiration("Never")
    setOriginalUrl("")
    setIsCreateLinkPopup(false)
  }
  return <AnimatePresence>
    {isCreateLinkPopup && (
      <>
        <motion.div
          className="max-w-[46rem] w-full fixed right-0 top-0 h-screen bg-[#03091d] z-50 border-l-2 border-[#ffffff21] rounded-tl-2xl rounded-bl-2xl shadow-[0_0_30px_#00000066] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="w-full h-14 flex items-center px-8 border-b-2 border-[#181f3eeb] text-[#ffffff87] cursor-pointer" onClick={handleClosePopup}>
            <FaArrowRightToBracket size={20} />
          </div>

          <div className="flex flex-col justify-between h-[92%]">
            <div className="w-full h-full px-6 pt-6">
              <div className="flex gap-2 items-center text-lg font-medium">Create New Link</div>

              <InputItem title="Destination URL" placeholder="Add Link" targetValue={originalUrl} setTargetValue={setOriginalUrl} />
              <InputItem title="Shorten key" placeholder="(optional)" targetValue={shortenKey} setTargetValue={(value) => console.log(value)} textBeforeInput siderounded disabled />

              <div className="mt-8 flex flex-col gap-2">
                <div className="text-[#d2d7df] font-medium text-[15px]">Expiration</div>
                <Select selected={expiration} setSelected={setExpiration} />
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <div className="text-[#d2d7df] font-medium text-[15px]">QR Code</div>
                <QRcode originalUrl={originalUrl} />
              </div>
            </div>

            <div className="w-full flex justify-end px-6 pb-6 pt-2.5">
              <motion.div
                className="bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)] border border-[#1d2753] cursor-pointer rounded-md py-1.5 px-3 flex gap-3 items-center w-max"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
              >
                <span><FiLink /></span>Create New Link
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full h-full fixed top-0 left-0 z-40 bg-[#00000043] backdrop-blur-[2px]"
          onClick={handleClosePopup}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        />
      </>
    )}
  </AnimatePresence>
}

export default CreateLink