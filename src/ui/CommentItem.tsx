type Comment = {
  id: string;
  post_id: string;
  parent_id: string | null;
  content: string;
  image?: string | null;
  children?: Comment[];
};

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="pl-4 border-l border-slate-200 mt-3">
      <p className="text-slate-800">{comment.content}</p>

      {comment.image && (
        <img src={comment.image} className="mt-2 rounded-md max-w-xs" />
      )}

      {/* Reply button */}
      <button className="text-sm text-blue-500 mt-1">Reply</button>

      {/* Render children recursively */}
      {comment.children?.map((child) => (
        <CommentItem key={child.id} comment={child} />
      ))}
    </div>
  );
}
