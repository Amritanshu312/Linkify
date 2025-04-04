import Logo from "@/components/ui/Logo"
import { FiLink } from "react-icons/fi";

const CreateNewLinks = () => {
  return (
    <div className="max-w-[26rem] flex flex-col items-center gap-6 mt-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex gap-2 items-center text-xl mr-[2px]">Create New <Logo /> Link</div>
        <p className="text-[#6f74a6] text-center">Start shortening your links and track their performance seamlessly. Create a new link now to simplify sharing and gain valuable insights!</p>
      </div>

      <div className="bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)] border border-[#1d2753] cursor-pointer rounded-md py-1.5 px-3 flex gap-3 items-center hover:bg-[linear-gradient(180deg,#201c42,#0c163f,#0f1938,#1e184b)]">
        <span><FiLink /></span>Create New Link
      </div>
    </div>
  )
}

export default CreateNewLinks