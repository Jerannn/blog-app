import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { updateBlog } from "../services/apiBlogs";

function useUpdateBlog() {
  const dispatch = useAppDispatch();
  const { blog, isUpdating } = useAppSelector((state) => state.blogs);

  const update = async ({
    title,
    content,
    file,
  }: {
    title: string;
    content: string;
    file: File | null;
  }) => {
    if (!title || !content) {
      toast.error("Please provide title and content.");
      return;
    }

    try {
      await dispatch(
        updateBlog({ id: blog?.id, title, content, image: file }),
      ).unwrap();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    id: blog?.id || "",
    title: blog?.title,
    content: blog?.content,
    image: blog?.image,
    update,
    dispatch,
    isUpdating,
  };
}

export default useUpdateBlog;
