import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../services/apiBlogs";
import { openModal } from "../features/ui/UiSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { FaUserCircle } from "react-icons/fa";
import { formatDate } from "../utils/helper";
import { selectBlog } from "../features/blogs/BlogSlice";
import Button from "../ui/Button";
import useDelete from "../hooks/useDelete";
import Loading from "../ui/Loading";
import CommentSection from "../ui/CommentSection";

export default function PostDetailPage() {
  const { id: blogId } = useParams();
  const { isDeleting } = useDelete();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { blog, isFetching } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlog(blogId as string));
  }, [dispatch, blogId]);

  if (isFetching)
    return (
      <div className="mt-5">
        <Loading />
      </div>
    );

  return (
    <div className=" h-full md:h-auto w-full max-w-7xl bg-white md:bg-slate-100 p-5 md:p-10 m-auto">
      <article className="flex flex-col h-full">
        <h1 className="text-5xl text-slate-700">{blog?.title}</h1>

        <div className="flex items-center gap-2 h-16 border-t border-b border-slate-300  my-5">
          <FaUserCircle size={35} className="text-red-400" />
          <p className="text-slate-700">
            By{" "}
            <span className="font-semibold">
              {user?.id === blog?.user_id ? "Me" : blog?.authorName}
            </span>
            <span> • </span>
            Published on {formatDate(blog?.createdAt ?? "")}
          </p>
        </div>

        <p className="text-slate-800 mb-10">{blog?.content}</p>

        {blog?.image && (
          <div className="w-full overflow-hidden rounded-lg bg-slate-100 aspect-4/3">
            <img
              src={blog?.image}
              alt=""
              className="w-full max-h-200 object-contain rounded-lg bg-black/5"
            />
          </div>
        )}

        {user?.id === blog?.user_id && (
          <div className="flex justify-end items-center gap-3 mt-5">
            <Button
              type="button"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                dispatch(openModal("editBlog"));
                dispatch(selectBlog(blog));
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
                dispatch(selectBlog(blog));
              }}
            >
              Delete
            </Button>
          </div>
        )}

        <CommentSection />
      </article>
    </div>
  );
}
