import { closeModal } from "../features/ui/UiSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import { IoIosWarning } from "react-icons/io";
import useDelete from "../hooks/useDelete";

export default function Delete() {
  const dispatch = useAppDispatch();
  const { id, handleDelete, isDeleting } = useDelete();

  return (
    <div className="max-w-80 w-full bg-slate-100 rounded-md ">
      <div className=" flex flex-col justify-center items-center p-6">
        <IoIosWarning size={40} className="text-red-700" />
        <h2 className="font-bold text-slate-700 text-center my-3">
          Delete Blog Post?
        </h2>

        <p className="text-center text-slate-500">
          Are you sure you want to delete this post?{" "}
        </p>
      </div>

      <footer className="flex justify-center items-center gap-5 py-4 border-t border-slate-300">
        <button
          onClick={() => dispatch(closeModal())}
          className="px-5 py-1 rounded-md border-2 border-slate-300 font-semibold text-slate-700 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => handleDelete(id ?? "")}
          className="px-5 py-1 rounded-md border-2 border-red-500 font-semibold text-white bg-red-500 cursor-pointer"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </footer>
    </div>
  );
}
