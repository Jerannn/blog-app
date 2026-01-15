import { IoIosClose } from "react-icons/io";
import { closeModal, openModal } from "../features/ui/UiSlice";
import { useAppSelector } from "../hooks/reduxHooks";
import { formatDate } from "../utils/helper";
import { FaUserCircle } from "react-icons/fa";
import Button from "./Button";
import { selectBlog } from "../features/blogs/BlogSlice";
import useBlogItem from "../hooks/useDelete";

export default function PreviewBlog() {
  const selectedBlog = useAppSelector((state) => state.blogs.selectedBlog);
  const { userId, isDeleting, dispatch } = useBlogItem();

  return (
    <div className="max-w-8/12 w-full bg-slate-100 p-10 rounded-md relative">
      <button
        onClick={() => dispatch(closeModal())}
        className="absolute top-7 right-7 cursor-pointer  rounded-full hover:bg-slate-200 duration-200"
      >
        <IoIosClose size={30} className="text-slate-800" />
      </button>

      <article>
        <h1 className="text-5xl text-slate-700">{selectedBlog?.title}</h1>

        <div className="flex items-center gap-2 h-16 border-t border-b border-slate-300  my-5">
          <FaUserCircle size={35} className="text-red-400" />
          <p className="text-slate-700">
            By <span className="font-semibold">{selectedBlog?.authorName}</span>
            <span> • </span>
            Published on {formatDate(selectedBlog?.createdAt ?? "")}
          </p>
        </div>

        <p className="text-slate-800">{selectedBlog?.content}</p>

        {userId === selectedBlog?.user_id && (
          <div className="flex justify-end items-center gap-3 mt-5">
            <Button
              type="button"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                dispatch(openModal("editBlog"));
                dispatch(selectBlog(selectedBlog));
              }}
            >
              Edit
            </Button>

            <Button
              type="button"
              className="bg-red-500 hover:bg-red-600"
              isDisabled={isDeleting}
              onClick={() => {
                dispatch(openModal("deleteBlog"));
                dispatch(selectBlog(selectedBlog));
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </article>
    </div>
  );
}
