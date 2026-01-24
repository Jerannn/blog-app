import DeleteBlog from "../features/blogs/DeleteBlog";
import UpdateBlog from "../features/blogs/UpdateBlog";
import DeleteComment from "../features/comments/DeleteComment";
import { useAppSelector } from "../hooks/reduxHooks";
import Modal from "./Modal";

export default function ModalLayout() {
  const { isModalOpen, modalType } = useAppSelector((state) => state.ui);

  if (!isModalOpen) return null;

  return (
    <Modal>
      {modalType === "editBlog" && <UpdateBlog />}
      {modalType === "deleteBlog" && <DeleteBlog />}
      {modalType === "deleteComment" && <DeleteComment />}
    </Modal>
  );
}
