"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const LinkContext = createContext(null);

export function LinkProvider({ children }) {
  const [isCreateLinkPopup, setIsCreateLinkPopup] = useState(false)

  return (
    <LinkContext.Provider value={{
      isCreateLinkPopup,
      setIsCreateLinkPopup
    }}>
      {children}
    </LinkContext.Provider>
  );
}

export const useLink = () => useContext(LinkContext);
