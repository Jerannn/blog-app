import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { updateBlog } from "../services/apiBlogs";

function useUpdateBlog() {
  const dispatch = useAppDispatch();
  const { selectedBlog, isUpdating } = useAppSelector((state) => state.blogs);

  const update = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    if (!title || !content) {
      toast.error("Please provide title and content.");
      return;
    }

    try {
      await dispatch(
        updateBlog({ id: selectedBlog?.id, title, content })
      ).unwrap();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    title: selectedBlog?.title,
    content: selectedBlog?.content,
    update,
    dispatch,
    isUpdating,
  };
}

export default useUpdateBlog;
