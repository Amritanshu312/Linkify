"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function AuthLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/", { shallow: false });
    }
  }, [status, router]);

  return (status === "loading" || status === "authenticated") ? <Loader /> : children;
  // return (status === "loading") ? <Loader /> : children;
}
