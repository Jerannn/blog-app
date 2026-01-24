import { memo } from "react";
import { formatDate } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import type { Blog } from "./types";
import { FaUserCircle } from "react-icons/fa";

type BlogsItemProps = {
  data: Blog;
};

function BlogsItem({ data }: BlogsItemProps) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <article
        onClick={() => {
          navigate(`/post/${data.id}`);
        }}
        className="max-w-2xl m-auto bg-white p-5 space-y-3 my-5 rounded-sm cursor-pointer"
      >
        <div className="flex items-center gap-2 h-16 border-b border-slate-300 mb-5">
          <FaUserCircle size={35} className="text-red-400" />
          <p className="text-slate-700 flex flex-col">
            <span className="font-semibold">
              {user?.id === data.user_id ? "Me" : data.authorName}
            </span>
            <span>Published on {formatDate(data.createdAt)}</span>
          </p>
        </div>

        <h2 className="text-lg font-semibold text-slate-900">{data.title}</h2>
        <p className="text-md text-slate-800 line-clamp-3">{data.content}</p>

        {data?.image && (
          <div className="w-full overflow-hidden rounded-lg bg-slate-100 ">
            <img
              src={data?.image}
              alt=""
              className="w-full max-h-200 object-contain rounded-lg bg-black/5"
            />
          </div>
        )}
      </article>
    </>
  );
}

export default memo(BlogsItem);
