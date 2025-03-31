"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from 'sonner'
import AuthListener from "./AuthListener";
import { AuthProvider } from "@/context/authProvider";


export const Provider = ({ children }) => {
  return <>
    <Toaster theme="dark" richColors />
    <SessionProvider>
      <AuthProvider>
        <AuthListener />
        {children}
      </AuthProvider>
    </SessionProvider>
  </>;
};