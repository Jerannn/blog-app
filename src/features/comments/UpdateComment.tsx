import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateComment } from "../../services/apiComment";
import { CommentFormBase } from "./CommentFormBase";

type UpdateCommentProps = {
  id: string;
  onIsEditing: (isEditing: boolean) => void;
};

type PayloadType = {
  post_id?: string;
  parent_id: string;
  content: string;
  image: File | null;
  authorName?: string;
  removeImage?: boolean;
};

export default function UpdateComment({ id, onIsEditing }: UpdateCommentProps) {
  const dispatch = useAppDispatch();

  const handleUpdate = async (payload: PayloadType) => {
    await dispatch(
      updateComment({
        ...payload,
        id,
      }),
    ).unwrap();
    onIsEditing(false);
  };

  return <CommentFormBase id={id} onSubmit={handleUpdate} />;
}
