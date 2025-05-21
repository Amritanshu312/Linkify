import { motion, AnimatePresence } from "framer-motion";

const Setting = ({
  isSettingToggled
}) => {
  return (
    <AnimatePresence>
      {isSettingToggled && (
        <motion.div
          className="w-full h-full fixed top-0 left-0 bg-[#03091d5c] z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="max-w-96 w-full bg-[linear-gradient(#131a33d4,#0c1227,#0c132c,#0e152ed4)] border-2 backdrop-xl rounded-xl border-[#19203c] px-4 py-3 flex flex-col gap-1.5"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Setting