"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession as useNextAuthSession } from "next-auth/react";
import { decrypt } from "@/lib/crypto";
import { toast } from "sonner";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, status } = useNextAuthSession();
  const [userInfo, setUserInfo] = useState({})
  const [fetchLoading, setFetchLoading] = useState(true)


  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchUserInfo = async () => {
      setFetchLoading(true)
      try {
        const res = await fetch("/api/user/info", {
          headers: { 'Cache-Control': 'no-cache' },
          signal: controller.signal
        });

        if (!res.ok) {
          toast.error(`User Fetch Failed with status ${res.status}`)
          throw new Error(`API request failed with status ${res.status}`);
        }
        const data = await res.json();

        if (!data) return {};

        const sensitiveKeys = new Set(["_id", "createdAt", "updatedAt"]);

        const entries = Object.entries(data);
        const decryptedEntries = await Promise.all(
          entries.map(async ([key, value]) => {
            const shouldDecrypt = typeof value === "string" && !sensitiveKeys.has(key);
            const processedValue = shouldDecrypt ? decrypt(value) : value;
            return [key, processedValue];
          })
        );
        const decryptedData = Object.fromEntries(decryptedEntries);
        setUserInfo(decryptedData);
        setFetchLoading(false)
        return decryptedData;
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching user info:", error);
        }
        setFetchLoading(false)
        return null;
      }
    };
    const controller = new AbortController();
    fetchUserInfo();
    return () => {
      controller.abort();
    };
  }, [status]);

  return (
    <AuthContext.Provider value={{
      session,
      status,
      userInfo,
      fetchLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
