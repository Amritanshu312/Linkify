import Image from "next/image"

const Logo = ({
  w, h, notshowTitle
}) => {
  return (
    <div className="flex items-center gap-2 font-['poppins'] py-2">
      <div className="bg-[linear-gradient(45deg,#0e1530,#090e23,#0d142d)] border-2 border-[#1c2340] rounded-lg p-1 w-max">
        <Image src={"/images/logo.svg"} width={w || 30} height={h || 30} alt="logo" />
      </div>

      {!notshowTitle && <div className="font-medium ">Linkify</div>}
    </div>
  )
}

export default Logo