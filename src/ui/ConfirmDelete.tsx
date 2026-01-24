import { IoIosWarning } from "react-icons/io";
import { useAppDispatch } from "../hooks/reduxHooks";
import { closeModal } from "../features/ui/UiSlice";

type ConfirmDeleteProps = {
  header: string;
  message: string;
  isDeleting: boolean;
  onDelete: () => void;
};

export default function ConfirmDelete({
  header,
  message,
  isDeleting,
  onDelete,
}: ConfirmDeleteProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="max-w-80 w-full bg-slate-100 rounded-md ">
      <div className=" flex flex-col justify-center items-center p-6">
        <IoIosWarning size={40} className="text-red-700" />
        <h2 className="font-bold text-slate-700 text-center my-3">
          {header}
          {/* Delete Blog Post? */}
        </h2>

        <p className="text-center text-slate-500">
          {message}
          {/* Are you sure you want to delete this post? */}
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
          onClick={onDelete}
          className="px-5 py-1 rounded-md border-2 border-red-500 font-semibold text-white bg-red-500 cursor-pointer"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </footer>
    </div>
  );
}
// handleDelete(id ?? "")
