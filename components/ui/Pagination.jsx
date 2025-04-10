const Pagination = ({
  setPage
}) => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex gap-2">
        <div
          className="bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)] border border-[#1d2753] cursor-pointer rounded-md py-1.5 px-3 flex gap-3 items-center hover:bg-[linear-gradient(180deg,#201c42,#0c163f,#0f1938,#1e184b)]"
          onClick={() => {
            setPage(prev => prev === 1 ? 1 : prev++)
          }}
        >Previous</div>
        <div
          className="bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)] border border-[#1d2753] cursor-pointer rounded-md py-1.5 px-3 flex gap-3 items-center hover:bg-[linear-gradient(180deg,#201c42,#0c163f,#0f1938,#1e184b)]"
          onClick={() => {
            setPage(prev => prev++)
          }}
        >Next</div>
      </div>
    </div>
  )
}

export default Pagination