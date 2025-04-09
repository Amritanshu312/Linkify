"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./authProvider";

const LinkContext = createContext(null);

export function LinkProvider({ children }) {
  const { status } = useAuth()
  const [isCreateLinkPopup, setIsCreateLinkPopup] = useState(false)
  const [linkLoading, setLinkLoading] = useState(true)
  const [links, setLinks] = useState([])
  const [page, setPage] = useState(1)


  useEffect(() => {

    if (status !== "authenticated") return;

    const controller = new AbortController();
    const signal = controller.signal;
    let isMounted = true;

    const fetchLists = async () => {
      setLinkLoading(true);
      try {
        const res = await fetch(`/api/user/links/list?page=${page}&perpage=10`, { signal });

        if (!res.ok) {
          toast.error(`Links Fetch Failed with status ${res.status}`);
          throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();
        if (!data || typeof data !== "object") return;

        setLinks(data?.data)

      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching user info:", error);
          toast.error("Failed to load user info.");
        }
      } finally {
        if (isMounted) setLinkLoading(false);
      }
    }
    fetchLists()


    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [status]);

  return (
    <LinkContext.Provider value={{
      isCreateLinkPopup,
      setIsCreateLinkPopup,
      links,
      setLinks,
      linkLoading,
      setPage,
      page
    }}>
      {children}
    </LinkContext.Provider>
  );
}

export const useLink = () => useContext(LinkContext);
