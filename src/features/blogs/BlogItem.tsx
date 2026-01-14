import { memo } from "react";
import Button from "../../ui/Button";
import type { Blog } from "./types";
import { formatDate } from "../../utils/helper";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteBlog } from "../../services/apiBlogs";

type BlogsItemProps = {
  data: Blog;
};

function BlogsItem({ data }: BlogsItemProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { isDeleting } = useAppSelector((state) => state.blogs);

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    dispatch(deleteBlog(id));
  };

  return (
    <>
      <article className="bg-white p-5 space-y-3 my-5 rounded-sm">
        <h2 className="text-lg font-semibold text-slate-900">{data.title}</h2>
        <p className="text-md text-slate-800 line-clamp-3">{data.content}</p>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className=" text-slate-700 text-sm">
              <span className="font-semibold">Posted from: </span>
              {data.authorName}
            </p>

            <p className=" text-slate-700 text-sm">
              <span className="font-semibold">Created on: </span>
              {formatDate(data.createdAt)}
            </p>
          </div>

          {user?.id === data.user_id ? (
            <div className="space-x-3">
              <Button type="button" className="bg-blue-500 hover:bg-blue-600">
                Edit
              </Button>
              <Button
                type="button"
                className="bg-red-500 hover:bg-red-600"
                isDisabled={isDeleting}
                onClick={() => handleDelete(data.id)}
              >
                Delete
              </Button>
            </div>
          ) : null}
        </div>
      </article>
    </>
  );
}

export default memo(BlogsItem);
