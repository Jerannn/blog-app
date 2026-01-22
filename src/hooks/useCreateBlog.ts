import toast from "react-hot-toast";
import { createBlog } from "../services/apiBlogs";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { useNavigate } from "react-router-dom";

type CreateBlog = {
  title: string;
  content: string;
  file: File | null;
};

export function useCreateBlog() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isCreating = useAppSelector((state) => state.blogs.isCreating);

  const create = async ({ title, content, file }: CreateBlog) => {
    if (!title || !content) {
      toast.error("Please provide title and content.");
      return;
    }

    const newBlogData = {
      title,
      content,
      authorName: user?.fullName || "",
      authorEmail: user?.email || "",
      user_id: user?.id || "",
      image: file,
    };

    try {
      await dispatch(createBlog(newBlogData)).unwrap();
      navigate("/dashboard", { replace: true });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { create, isCreating };
}
