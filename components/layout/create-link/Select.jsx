"use client"

import { PiClockCountdownBold } from "react-icons/pi"
import { FaChevronDown } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { options } from "@/utils/Date_Time"



const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: {
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      when: "afterChildren",
      staggerDirection: -1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 },
}

const Select = ({
  selected,
  setSelected
}) => {
  const [isActive, setIsActive] = useState(false)

  const handleSelect = (value) => {
    setSelected(value)
    setIsActive(false)
  }

  return (
    <div className="w-full relative h-max">
      <motion.div
        className="w-full flex items-center justify-between text-[#ffffffb7] hover:bg-[linear-gradient(45deg,#101836,#0e152d,#0a1027)] bg-[linear-gradient(45deg,#0f1632,#0c1227,#0e1530)] border-2 border-[#181f3e] px-3 py-1.5 rounded-md cursor-pointer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.991 }}
        onClick={() => setIsActive(prev => !prev)}
      >
        <div className="flex gap-2 items-center">
          <span><PiClockCountdownBold size={20} /></span>
          <div>{selected}</div>
        </div>
        <div className={`transition-transform ${isActive ? "rotate-180" : ""}`}>
          <FaChevronDown />
        </div>
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute top-13 px-3 py-2 rounded-md left-0 bg-[linear-gradient(45deg,#0f1632,#0c1227,#0e1530)] border-2 border-[#181f3e] w-full z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {options.map((opt) => (
              <motion.div
                key={opt}
                variants={itemVariants}
                onClick={() => handleSelect(opt)}
                className="text-sm text-white py-1.5 px-2 rounded-md cursor-pointer hover:bg-[#181f3e] transition-colors"
              >
                {opt}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Select
