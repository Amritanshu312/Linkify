import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { motion, AnimatePresence } from "framer-motion"
import Alert from "@/components/ui/Alert"
import { useConfirm } from "@/providers/ConfirmProvider"
import { toast } from "sonner"
import { useLink } from "@/context/linkProvider"

const OptionsDropdown = ({ _id, isMobile }) => {
  const [isClicked, setIsClicked] = useState(false)
  const { setLinks } = useLink()
  const confirm = useConfirm();

  const deleteLinks = async () => {
    toast.promise(
      (async () => {
        const response = await fetch(`/api/user/links/delete?_id=${_id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(
            data?.message || 'res no succesfull'
          );
        }

        const data = await response.json();

        if (response.ok && data.success) {

          setLinks(prev => {
            const index = prev?.data.findIndex(item => item?._id === _id);
            if (index === -1) return prev;
            const newData = [...prev.data];
            newData.splice(index, 1);
            return {
              ...prev,
              data: newData,
            };
          });

          return data.message || 'Link deleted successfully';
        } else {
          throw new Error(
            data?.message || 'Something went wrong while creating the link'
          );
        }
      })(),
      {
        loading: 'deleting link...',
        position: 'bottom-left',
        success: (message) => message,
        error: (err) => err.message || 'Unexpected error occurred',
      }
    );



  }

  const handleClick = async () => {
    setIsClicked(false)

    const confirmed = await confirm();

    if (confirmed) {
      deleteLinks()
    }
  };


  return (
    <>

      <div className="relative">
        <div className="items-center h-full flex justify-center" onClick={() => setIsClicked(prev => !prev)}>
          <BsThreeDots />
        </div>

        <AnimatePresence>
          {isClicked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-[51] top-8 -left-12/4 bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)] border border-[#1d2753] py-1 px-4 flex gap-3 items-center hover:bg-[linear-gradient(180deg,#201c42,#0c163f,#0f1938,#1e184b)] rounded-lg cursor-pointer shadow-lg"
            >
              <div onClick={handleClick}>delete</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isClicked && <div className="w-full h-full fixed top-0 left-0 z-50" onClick={() => setIsClicked(prev => !prev)}></div>}
    </>

  )
}

export default OptionsDropdown
