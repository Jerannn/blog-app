import type { Comment } from "../features/comments/types";

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function capitalizeFirstLetter(str: string) {
  if (!str.length) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateCommentTree(comments: Comment[]) {
  // Converts a flat comment list into a nested tree for UI rendering
  const commentById = new Map<string, Comment>();
  const roots: Comment[] = [];

  // Prepare lookup map so we can attach children efficiently
  comments.forEach((c) => {
    commentById.set(c.id, { ...c, children: [] });
  });

  // Attach replies to their parent comment
  commentById.forEach((comment) => {
    if (comment.parent_id) {
      commentById.get(comment.parent_id)?.children?.push(comment);
    } else {
      roots.push(comment);
    }
  });

  return roots;
}
