import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../services/apiBlogs";
import { openModal } from "../features/ui/UiSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { FaUserCircle } from "react-icons/fa";
import { formatDate } from "../utils/helper";
import { selectBlog } from "../features/blogs/BlogSlice";
import Loading from "../ui/Loading";
import CommentSection from "../features/comments/CommentSection";
import ThreeDotMenu from "../ui/ThreeDotMenu";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function PostDetailPage() {
  const { id: postId } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { blog, isFetching } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlog(postId as string));
  }, [dispatch, postId]);

  if (isFetching)
    return (
      <div className="mt-5">
        <Loading />
      </div>
    );

  return (
    <div className=" h-full md:h-auto w-full max-w-7xl bg-white md:bg-slate-100 p-5 md:p-10 m-auto relative ">
      <article className="flex flex-col h-full">
        {user?.id === blog?.user_id && (
          <div className="absolute right-11">
            <ThreeDotMenu
              renderContent={() => (
                <>
                  <button
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-sm"
                    onClick={() => {
                      dispatch(openModal("editBlog"));
                      dispatch(selectBlog(blog));
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-sm"
                    onClick={() => {
                      dispatch(openModal("deleteBlog"));
                      dispatch(selectBlog(blog));
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            >
              <button className="w-4 h-6 flex justify-center items-center cursor-pointer hover:bg-slate-100 rounded-full transition duration-200 ease-in-out">
                <BsThreeDotsVertical size={17} />
              </button>
            </ThreeDotMenu>
          </div>
        )}

        <h1 className="text-5xl text-slate-700">{blog?.title}</h1>

        <div className="flex items-center gap-2 h-16 border-t border-b border-slate-300  my-5">
          <FaUserCircle size={35} className="text-red-400" />
          <p className="text-slate-700">
            <span className="font-semibold">
              {user?.id === blog?.user_id ? "Me" : blog?.authorName}
            </span>
            <span> • </span>
            <span>Published on {formatDate(blog?.createdAt ?? "")}</span>
          </p>
        </div>

        <p className="text-slate-800 mb-10">{blog?.content}</p>

        {blog?.image && (
          <div className="w-full overflow-hidden rounded-lg bg-black/3 p-3 ">
            <img
              src={blog?.image}
              alt={blog?.title}
              className="w-full h-full max-h-[800px] object-contain rounded-lg "
            />
          </div>
        )}

        <CommentSection postId={postId} />
      </article>
    </div>
  );
}
