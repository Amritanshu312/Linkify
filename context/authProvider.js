"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession as useNextAuthSession } from "next-auth/react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, status } = useNextAuthSession();
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if (status === "authenticated") {

    }
  }, [status])

  return (
    <AuthContext.Provider value={{ session, status }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
