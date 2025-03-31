import clsx from "clsx"

const LinkItem = ({
  title,
  logo,
  active
}) => {
  return (
    <div className={clsx("flex w-full hover:bg-[#191f3f] hover:text-[#ecececf4] duration-75 cursor-pointer px-2 py-2.5 rounded-lg items-center gap-2", {
      "bg-[#191f3f] text-[#ecececf4] hover:bg-[#232849]": !!active
    })}>
      <span>{logo}</span>
      <div>{title}</div>
    </div>
  )
}

export default LinkItem