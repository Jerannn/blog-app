import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { generateCommentTree } from "../../utils/helper";
import { getComments } from "../../services/apiComment";
import CommentItem from "./CommentItem";
import CommentForm from "./AddComment";

type CommentSectionProps = {
  postId?: string;
};

export default function CommentSection({ postId }: CommentSectionProps) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comments.comments);

  const commentsTree = useMemo(() => generateCommentTree(comments), [comments]);
  const totalComments = commentsTree.length;

  useEffect(() => {
    dispatch(getComments(postId || ""));
  }, [postId, dispatch]);

  return (
    <div className="bg-white p-10 mt-10 rounded-4xl">
      <CommentForm />

      <h1 className="text-lg font-bold my-10 text-slate-700 flex items-center gap-2">
        Comments
        <span className="bg-amber-600 px-2 rounded-3xl text-sm text-white">
          {totalComments}
        </span>
      </h1>

      {commentsTree.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
