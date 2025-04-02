"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from 'sonner'
import AuthListener from "./AuthListener";
import { AuthProvider } from "@/context/authProvider";
import { Suspense } from "react";


export const Provider = ({ children }) => {
  return <>
    <Toaster theme="dark" richColors />
    <SessionProvider>
      <AuthProvider>
        <Suspense fallback={null}>
          <AuthListener />
        </Suspense>

        {children}
      </AuthProvider>
    </SessionProvider>
  </>;
};