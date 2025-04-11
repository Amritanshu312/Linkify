"use client"
import { useAuth } from "@/context/authProvider";
import { useLink } from "@/context/linkProvider";
import CreateNewLinks from "@/pages/home/no-links/CreateNewLinks";
import LinksItems from "@/pages/home/no-links/LinksItems";
import LinkCard from "./LinkCard";
import { Fragment } from "react";
import Pagination from "@/components/ui/Pagination";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const Home = () => {
  const { session, status } = useAuth()
  const { links, setPage, page } = useLink()


  return ((session && status === "authenticated") && links.data.length === 0) ?

    <div className="min-[586px]:px-12 min-[586px]:py-6 flex flex-col gap-8 items-center">
      <LinksItems />
      <CreateNewLinks />
    </div> :

    <div className="min-[586px]:px-12 min-[586px]:py-6 flex flex-col gap-4">

      {links.data.map(item => <Fragment key={item._id}>
        <LinkCard data={item} />
      </Fragment>)}

      <div className="mt-4">
        <Pagination setPage={setPage} currentPage={page} totalPages={links?.totalPages} />
      </div>

    </div>

}

export default Home