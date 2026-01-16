import { memo } from "react";
import { formatDate } from "../../utils/helper";
import { openModal } from "../ui/UiSlice";
import { selectBlog } from "./BlogSlice";
import Button from "../../ui/Button";
import type { Blog } from "./types";
import useBlogItem from "../../hooks/useDelete";
import { LuScanEye } from "react-icons/lu";

type BlogsItemProps = {
  data: Blog;
};

function BlogsItem({ data }: BlogsItemProps) {
  const { userId, isDeleting, dispatch } = useBlogItem();
  return (
    <>
      <article className="bg-white p-5 space-y-3 my-5 rounded-sm">
        <h2 className="text-lg font-semibold text-slate-900">{data.title}</h2>
        <p className="text-md text-slate-800 line-clamp-3">{data.content}</p>

        <div className="flex justify-between items-start gap-2 flex-col md:flex-row md:items-center">
          <div className="flex flex-col">
            <p className=" text-slate-700 text-sm">
              <span className="font-semibold">By: </span>
              {data.authorName}
            </p>

            <p className=" text-slate-700 text-sm">
              <span className="font-semibold">Published on: </span>
              {formatDate(data.createdAt)}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {userId === data.user_id && (
              <>
                <Button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    dispatch(openModal("editBlog"));
                    dispatch(selectBlog(data));
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
                    dispatch(selectBlog(data));
                  }}
                >
                  Delete
                </Button>
              </>
            )}

            <Button
              type="button"
              className="bg-slate-500 hover:bg-slate-600"
              isDisabled={false}
              onClick={() => {
                dispatch(openModal("viewBlog"));
                dispatch(selectBlog(data));
              }}
            >
              <LuScanEye size={25} />
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}

export default memo(BlogsItem);
