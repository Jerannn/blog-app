import { useNavigate } from "react-router-dom";
import { closeModal } from "../features/ui/UiSlice";
import { deleteBlog, getBlogs } from "../services/apiBlogs";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

function useDelete() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isDeleting, blog, page, pageSize } = useAppSelector(
    (state) => state.blogs,
  );

  const handleDelete = async (id: string) => {
    await dispatch(deleteBlog(id)).unwrap();
    dispatch(closeModal());
    dispatch(getBlogs({ page, pageSize }));
    navigate("/dashboard");
  };

  return {
    id: blog?.id,
    isDeleting,
    handleDelete,
    dispatch,
  };
}

export default useDelete;
