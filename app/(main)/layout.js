"use client"
import PagesInfoHeader from "@/components/layout/PagesInfoHeader";
import Loader from "@/components/Loader";
import Sidebar from "@/partials/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login", { shallow: false });
    }

  }, [status, session, router]);

  return (status === "loading" || status === "unauthenticated") ? <Loader /> : <>
    <Sidebar />

    <div className="min-h-screen flex flex-col ml-[23rem] max-[1400px]:ml-20">
      <PagesInfoHeader />
      {children}
    </div>

  </>;
}