"use client"
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

  }, [status, session]);

  return <>
    <Sidebar />
    {/* {children} */}
  </>;
}