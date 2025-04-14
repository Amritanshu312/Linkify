import LoginForm from "@/contents/auth/login/LoginForm"
import SignInWithGoogle from "@/contents/auth/SignInWithGoogle"
import Image from "next/image"
import Link from "next/link"

const Login = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-[28rem] flex flex-col items-center gap-8">

        <div className="bg-[linear-gradient(45deg,#0e1530,#090e23,#0d142d)] border-2 border-[#1c2340] rounded-lg p-1 w-max">
          <Image src={"/images/logo.svg"} width={36} height={36} alt="logo" />
        </div>

        <div className="flex flex-col gap-4 items-center">
          <div className="font-['poppins'] text-lg">&quot;Login in with your email!&quot;</div>
          <p className="text-[#6f74a6] font-['poppins'] text-center">&quot;Easily create, analyze, and share links. Boost your performance and make an impact with trackable data.&quot;</p>
        </div>


        <SignInWithGoogle />

        <div className="w-full font-['poppins'] flex gap-6 items-center max-w-[22rem]">
          <div className="w-full h-0.5 bg-[#6f74a634]"></div>
          <div>or</div>
          <div className="w-full h-0.5 bg-[#6f74a634]"></div>
        </div>

        <LoginForm />

        <div className="font-['poppins'] text-[#f1f1f1ee] text-center">Don&apos;t Have an account? <Link href={"/register"} className="text-[#6c73c4]">Sign Up</Link></div>
      </div>
    </div>
  )
}

export default Login