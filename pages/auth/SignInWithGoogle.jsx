"use client"
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const SignInWithGoogle = () => {
  return (
    <div className="flex items-center justify-center bg-[linear-gradient(180deg,#101733db,#0c1227db,#0e152edb)] border-2 border-[#181f3e] rounded-lg cursor-pointer mt-6 relative group font-['poppins'] w-full max-w-[22rem] flex-col gap-5">
      <button onClick={() => signIn("google", { callbackUrl: "/?success=true" })} className="w-full h-full py-2 cursor-pointer flex gap-2 justify-center items-center">
        <span className="bg-[#080c14] p-0.5 rounded-full border-2 border-[#1d1f3c] flex items-center justify-center"><FcGoogle size={20} /></span>
        Continue With Google
      </button>

      <div className="w-[98%] h-full bg-[linear-gradient(180deg,#101733db,#0c1227db,#0e152edb)] border-2 border-[#181f3e] rounded-lg absolute -top-[10.9px] left-1/2 -translate-x-1/2 -z-10 group-hover:top-0 duration-300"></div>
      <div className="w-[92%] h-full bg-[linear-gradient(180deg,#101733db,#0c1227db,#0e152edb)] border-2 border-[#181f3e] rounded-lg absolute -top-5 left-1/2 -translate-x-1/2 -z-20 group-hover:top-0 duration-500"></div>
    </div>
  )
}

export default SignInWithGoogle