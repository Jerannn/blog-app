import { closeModal } from "../features/ui/UiSlice";
import { deleteBlog } from "../services/apiBlogs";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

function useDelete() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { isDeleting, selectedBlog } = useAppSelector((state) => state.blogs);

  const handleDelete = async (id: string) => {
    await dispatch(deleteBlog(id)).unwrap();
    dispatch(closeModal());
  };

  return {
    userId: user?.id,
    id: selectedBlog?.id,
    isDeleting,
    handleDelete,
    dispatch,
  };
}

export default useDelete;
