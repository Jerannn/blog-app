import useDeleteComment from "../../hooks/useDeleteComment";
import ConfirmDelete from "../../ui/ConfirmDelete";

export default function DeleteComment() {
  const { isDeleting, handleDeleteComment } = useDeleteComment();
  return (
    <ConfirmDelete
      header="Delete Comment?"
      message="Are you sure you want to delete this comment?"
      isDeleting={isDeleting}
      onDelete={handleDeleteComment}
    />
  );
}
