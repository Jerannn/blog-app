import { nextPage, prevPage } from "../features/blogs/BlogSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

function usePagination() {
  const dispatch = useAppDispatch();
  const { page, pageSize, total } = useAppSelector((state) => state.blogs);

  const totalPages = Math.ceil(total / pageSize);

  const handleIncrement = () => {
    if (page >= totalPages) return;
    dispatch(nextPage());
  };

  const handleDecrement = () => {
    if (page > 1) dispatch(prevPage());
  };

  return { page, totalPages, handleIncrement, handleDecrement };
}

export default usePagination;
