"use client"
import { HiOutlineMail } from "react-icons/hi";
import Input from "../../../components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";
import { toast } from 'sonner'

const RegisterForm = () => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [Cpassword, setCpassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!userName.trim() || !email.trim() || !password.trim() || !Cpassword.trim()) {
      toast.error("All fields are required!");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email format! Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (password !== Cpassword) {
      toast.error("Passwords do not match! Please re-enter.");
      return;
    }

    setIsSubmitting(true);
    toast.info("Submitting your details...");

    try {
      const res = await register({
        email: email,
        password: password,
        name: userName,
      });

      if (res?.error) {
        toast.error(res.error.message || "An error occurred during registration.");
      } else {
        toast.success("Registration successful! Redirecting to login...");
        // Reset fields
        setCpassword("");
        setEmail("");
        setPassword("");
        setUserName("");
        router.push("/login");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      toast.info("Process completed.");
    }
  };



  return (
    <form onSubmit={handleSubmit} className="relative font-['poppins'] w-full max-w-[22rem] flex flex-col gap-5">

      <Input icon={<HiOutlineMail size={20} />} placeholder={"Your Name"} title={"Username"} type={"text"} targetValue={userName} setTargetValue={setUserName} />
      <Input icon={<HiOutlineMail size={20} />} placeholder={"example@gmail.com"} title={"E-mail"} type={"email"} targetValue={email} setTargetValue={setEmail} />
      <Input icon={<HiOutlineMail size={20} />} placeholder={"*****"} title={"Password"} type={"password"} targetValue={password} setTargetValue={setPassword} />
      <Input icon={<HiOutlineMail size={20} />} placeholder={"********"} title={"Confirm Password"} type={"password"} targetValue={Cpassword} setTargetValue={setCpassword} />


      <div className="flex items-center justify-center bg-[linear-gradient(180deg,#101733db,#0c1227db,#0e152edb)] border-2 border-[#181f3e] rounded-lg cursor-pointer mt-6 relative group">
        <button type="submit" className="w-full h-full py-2 cursor-pointer" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Create Now"}</button>

        <div className="w-[98%] h-full bg-[linear-gradient(180deg,#101733db,#0c1227db,#0e152edb)] border-2 border-[#181f3e] rounded-lg absolute -top-[10.9px] left-1/2 -translate-x-1/2 -z-10 group-hover:top-0 duration-200"></div>
        <div className="w-[92%] h-full bg-[linear-gradient(180deg,#101733db,#0c1227db,#0e152edb)] border-2 border-[#181f3e] rounded-lg absolute -top-5 left-1/2 -translate-x-1/2 -z-20 group-hover:top-0 duration-300"></div>
      </div>

    </form>
  )
}

export default RegisterForm