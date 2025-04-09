"use client"
import { useAuth } from "@/context/authProvider";
import { useLink } from "@/context/linkProvider";
import CreateNewLinks from "@/pages/home/no-links/CreateNewLinks";
import LinksItems from "@/pages/home/no-links/LinksItems";
import LinkCard from "./LinkCard";
import { Fragment } from "react";

const Home = () => {
  const { session, status } = useAuth()
  const { links } = useLink()
  console.log(links.length)

  return ((session && status === "authenticated") && links.length === 0) ?

    <div className="min-[586px]:px-12 min-[586px]:py-6 flex flex-col gap-8 items-center">
      <LinksItems />
      <CreateNewLinks />
    </div> :
    <div className="min-[586px]:px-12 min-[586px]:py-6 flex flex-col gap-4">
      {links.map(item => <Fragment key={item._id}>
        <LinkCard data={item} />
      </Fragment>)}
    </div>

}

export default Home