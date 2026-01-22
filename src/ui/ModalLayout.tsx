import { useAppSelector } from "../hooks/reduxHooks";
import Delete from "./Delete";
import Modal from "./Modal";
import UpdateBlogForm from "./UpdateBlogForm";

export default function ModalLayout() {
  const { isModalOpen, modalType } = useAppSelector((state) => state.ui);

  if (!isModalOpen) return null;

  return (
    <Modal>
      {modalType === "editBlog" && <UpdateBlogForm />}
      {modalType === "deleteBlog" && <Delete />}
    </Modal>
  );
}
