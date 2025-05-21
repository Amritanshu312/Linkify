"use client";
import { useAuth } from "@/context/authProvider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsArrowReturnRight } from "react-icons/bs";
import { toast } from "sonner";
import { motion } from "framer-motion";

const TopSites = () => {
  const { status } = useAuth();
  const [links, setLinks] = useState([]);
  const [linkLoading, setLinkLoading] = useState(false);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const controller = new AbortController();
    const signal = controller.signal;
    let isMounted = true;

    const fetchLinks = async () => {
      setLinkLoading(true);
      try {
        const res = await fetch(`/api/user/links/list?page=1&perpage=6&sort=clicks`, {
          signal,
        });

        if (!res.ok) {
          toast.error(`Links Fetch Failed with status ${res.status}`);
          throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();
        if (!data || typeof data !== 'object') return;

        if (isMounted) {
          setLinks(data?.data);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching user info:', error);
          toast.error('Failed to load user info.');
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
  }, [status]);

  return (
    <div className="px-4 py-4 w-full bg-[#0b0f2b9c] border-2 border-[#19203c64] rounded-lg">
      <div className="flex justify-between px-2">
        <div>Top Links</div>
        <Link href={"/?sort=clicks"}>View All</Link>
      </div>

      <div className="mt-3 flex flex-col gap-3 pt-2">
        {links?.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-[linear-gradient(#131a33d4,#0c1227d4,#0c132cd4,#0e152ed4)] border-2 border-[#19203c] flex flex-col p-2 px-4 rounded-[6px] gap-2 overflow-hidden max-[510px]:px-3"
          >
            <Link
              href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${item?.short_url}`}
              target="_"
              className="font-medium max-[655px]:text-[15px] max-[510px]:text-[13px]"
            >
              {process.env.NEXT_PUBLIC_WEBSITE_URL.replace(
                'http://',
                ''
              ).replace('https://', '')}
              /{item?.short_url}
            </Link>
            <div className="flex gap-2 items-center">
              <BsArrowReturnRight />
              <Link
                href={item.url}
                target="_"
                className="text-[#93a7c5] hover:text-[#a7bfe2] text-[15px] cursor-pointer line-clamp-1 max-[655px]:text-sm max-[940px]:max-w-96 max-[510px]:text-[12px]"
              >
                {item?.url}
              </Link>
            </div>
          </motion.div>
        ))}

        {Array.from({ length: linkLoading ? 6 : 0 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: i * 0.1 }}
            className="bg-[linear-gradient(#131a33d4,#0c1227d4,#0c132cd4,#0e152ed4)] border-2 border-[#19203c] flex flex-col p-2 px-4 rounded-[6px] gap-2 overflow-hidden max-[510px]:px-3 h-[60px]"
          />
        ))}
      </div>
    </div>
  );
};

export default TopSites;
