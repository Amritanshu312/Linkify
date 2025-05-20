import { motion, AnimatePresence } from "framer-motion";

const Alert = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
            <div className="font-medium text-[17px]">Are you absolutely sure?</div>
            <p className="text-[15px] text-[#babdc8]">
              This action is irreversible. It will permanently delete your Link and erase all associated data from our servers.
            </p>

            <div className="w-full flex gap-3 flex-wrap justify-end mt-2">
              <div
                className="border border-[#1d2753] cursor-pointer rounded-md py-1.5 px-3 flex gap-3 items-center hover:bg-[#201c42b7]"
                onClick={onCancel}
              >
                Cancel
              </div>
              <div
                className="bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)] border border-[#1d2753] cursor-pointer rounded-md py-1.5 px-3 flex gap-3 items-center hover:bg-[linear-gradient(180deg,#201c42,#0c163f,#0f1938,#1e184b)]"
                onClick={onConfirm}
              >
                Continue
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
