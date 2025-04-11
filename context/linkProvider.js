"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./authProvider";

const LinkContext = createContext(null);

export function LinkProvider({ children }) {
  const { status } = useAuth();

  const [isCreateLinkPopup, setIsCreateLinkPopup] = useState(false);
  const [linkLoading, setLinkLoading] = useState(true);

  const [links, setLinksState] = useState(() => typeof window === "undefined" ?
    { data: [] } :
    JSON.parse(localStorage.getItem("links") || "null") || { data: [] });


  const [page, setPage] = useState(links?.currentPage || 1);


  // Wrapper to persist `links` to localStorage on set
  const setLinks = (data) => {
    setLinksState(data);
    localStorage.setItem("links", JSON.stringify(data));
  };

  useEffect(() => {
    if (status !== "authenticated") return;

    const controller = new AbortController();
    const signal = controller.signal;
    let isMounted = true;

    const fetchLinks = async () => {
      setLinkLoading(true);
      try {
        const res = await fetch(`/api/user/links/list?page=${page}&perpage=6`, { signal });

        if (!res.ok) {
          toast.error(`Links Fetch Failed with status ${res.status}`);
          throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();
        if (!data || typeof data !== "object") return;

        if (data.data.length === 0 && page > 1 && data.currentPage > 1) {
          setPage(1)
        }

        if (isMounted) {
          setLinks(data);
          console.log("Links synced from server:", data);
        }

      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching user info:", error);
          toast.error("Failed to load user info.");
        }
      } finally {
        if (isMounted) setLinkLoading(false);
      }
    };

    fetchLinks();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [status, page]);

  return (
    <LinkContext.Provider
      value={{
        isCreateLinkPopup,
        setIsCreateLinkPopup,
        links,
        setLinks,
        linkLoading,
        setPage,
        page,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
}

export const useLink = () => useContext(LinkContext);
