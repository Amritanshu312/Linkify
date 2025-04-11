import ReactPaginate from "react-paginate"

const Pagination = ({
  setPage,
  currentPage,
  totalPages
}) => {
  return totalPages === 1 ? null : (
    <div className="h-full w-full flex items-center justify-between ">
      <div className="w-[84px] text-[15px] text-[#ffffffb4]">Page {currentPage} of {totalPages}</div>

      <div className="w-full flex justify-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          forcePage={currentPage - 1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          className="flex justify-center items-center w-max bg-[linear-gradient(#131a33d4,#0c1227d4,#0c132cd4,#0e152ed4)] border border-[#1d27535c] rounded-lg"
          pageClassName=" w-12 h-full"
          pageLinkClassName="w-full h-full flex items-center justify-center cursor-pointer hover:bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)] "
          previousClassName="h-full flex items-center cursor-pointer flex gap-3 items-center hover:bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)] "
          nextClassName="h-full flex items-center cursor-pointer flex gap-3 items-center hover:bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)]"
          nextLinkClassName="h-full w-full py-1.5 px-3"
          previousLinkClassName="h-full w-full py-1.5 px-3"
          activeClassName="bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)]"
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>

      <div></div>
    </div>

  )
}

export default Pagination