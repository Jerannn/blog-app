import usePagination from "../hooks/usePagination";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Pagination() {
  const { page, totalPages, handleIncrement, handleDecrement } =
    usePagination();

  return (
    <div className="bg-white border-2 border-slate-300 rounded-sm w-96 h-11 grid grid-cols-3">
      <button
        onClick={handleDecrement}
        className=" flex justify-center items-center gap-1 font-semibold cursor-pointer text-amber-500"
      >
        <IoIosArrowBack /> <span className="hidden sm:block">Previous</span>
      </button>

      <p className="flex justify-center items-center gap-1 border-l border-r border-slate-300 text-center ">
        Page <span className="font-semibold">{page}</span> of
        <span className="font-semibold">{totalPages}</span>
      </p>

      <button
        onClick={handleIncrement}
        className="flex justify-center items-center gap-1 font-semibold cursor-pointer text-amber-500"
      >
        <span className="hidden sm:block">Next</span> <IoIosArrowForward />
      </button>
    </div>
  );
}
