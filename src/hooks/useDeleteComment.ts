import { deleteComment } from "../services/apiComment";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

function useDeleteComment() {
  const dispatch = useAppDispatch();
  const { comment, isDeleting } = useAppSelector((state) => state.comments);

  const handleDeleteComment = () => {
    console.log(comment?.id);
    dispatch(deleteComment(comment?.id || ""));
  };
  return { isDeleting, handleDeleteComment };
}

export default useDeleteComment;
