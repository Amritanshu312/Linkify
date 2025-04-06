import Input from "@/components/ui/Input"

const Item = ({
  destination,
  shorten_key
}) => {
  return destination ? (
    <div className="mt-8 flex flex-col gap-2">
      <div className="text-[#d2d7df] font-medium text-[15px]">Destination URL</div>
      <Input placeholder={"Add Link"} />
    </div>) :
    
    shorten_key ?
      <div className="mt-8 flex flex-col gap-2">
        <div className="text-[#d2d7df] font-medium text-[15px]">Shorten key</div>

        <div className="flex items-center h-max">
          <div className="h-10 rounded-tl-md rounded-bl-md bg-[linear-gradient(45deg,#0f1632,#0c1227,#0e1530)] border-2 border-[#181f3e] flex items-center px-3.5 max-w-40 w-full text-center">Was.do</div>
          <Input placeholder={"(optional)"} siderounded />
        </div>
      </div> :
      null

}

export default Item