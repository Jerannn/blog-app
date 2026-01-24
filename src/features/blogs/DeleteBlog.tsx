import useDelete from "../../hooks/useDelete";
import ConfirmDelete from "../../ui/ConfirmDelete";

export default function DeleteBlog() {
  const { id, handleDelete, isDeleting } = useDelete();

  return (
    <ConfirmDelete
      header="Delete Blog Post?"
      message="Are you sure you want to delete this post?"
      isDeleting={isDeleting}
      onDelete={() => handleDelete(id ?? "")}
    />
  );
}
