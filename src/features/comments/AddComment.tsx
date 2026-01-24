import { useAppDispatch } from "../../hooks/reduxHooks";
import { addComment } from "../../services/apiComment";
import { CommentFormBase } from "./CommentFormBase";

export default function AddComment({ id }: { id?: string }) {
  const dispatch = useAppDispatch();

  return (
    <CommentFormBase
      id={id}
      onSubmit={(payload) => dispatch(addComment(payload))}
    />
  );
}
