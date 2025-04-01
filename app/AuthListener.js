"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthListener = () => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && searchParams.get("success") === "true") {
      toast.success(`Welcome, ${session?.user?.name || "User"}! 🎉`);

      // Remove `success=true` from the URL after showing the toast
      router.replace("/", undefined, { shallow: true });
    }

  }, [status, session, searchParams, router]);

  return null;
};

export default AuthListener;
