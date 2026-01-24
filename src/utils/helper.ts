import type { Comment } from "../features/comments/types";
import supabase from "../services/supabase";

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

export const getImageName = (file: File) =>
  `${crypto.randomUUID()}-${file.name}`.replaceAll("/", "");

export const getPublicImageUrl = ({
  imageName,
  bucketName,
}: {
  imageName: string;
  bucketName: string;
}) =>
  `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${imageName}`;

export const deleteImageIfExists = async ({
  image,
  bucketName,
}: {
  image?: string;
  bucketName: string;
}) => {
  if (!image) return;

  const path = image.split("/").at(-1);
  if (!path) return;

  const { error } = await supabase.storage.from(bucketName).remove([path]);

  if (error) throw new Error("Failed to delete image from storage");
};
