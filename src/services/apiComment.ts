import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "./supabase";
import type { Comment } from "../features/comments/types";
import {
  deleteImageIfExists,
  getImageName,
  getPublicImageUrl,
} from "../utils/helper";

interface CommentArgs {
  post_id?: string;
  parent_id: string | null;
  content: string;
  image?: File | null;
  authorName?: string;
}

interface UpdateCommentArgs extends CommentArgs {
  id: string;
  removeImage?: boolean;
}

export const getComments = createAsyncThunk<Comment[], string>(
  "comments/get",
  async (postId, { rejectWithValue }) => {
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      return rejectWithValue("Comments not found!");
    }

    return comments;
  },
);

export const addComment = createAsyncThunk<Comment, CommentArgs>(
  "comments/add",
  async (newComment, { rejectWithValue }) => {
    const imageName = `${Math.random()}-${newComment.image?.name}`.replaceAll(
      "/",
      "",
    );

    const imagePath = newComment.image
      ? getPublicImageUrl({ imageName, bucketName: "comment-images" })
      : null;

    // 1. Add comment
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          post_id: newComment.post_id,
          parent_id: newComment.parent_id,
          content: newComment.content,
          authorName: newComment.authorName,
          image: imagePath,
        },
      ])
      .select()
      .single();

    if (error) return rejectWithValue("Failed to add comment");

    if (newComment.image) {
      // 2. Upload image
      await supabase.storage
        .from("comment-images")
        .upload(imageName, newComment.image);
    }

    return data;
  },
);

export const updateComment = createAsyncThunk<Comment, UpdateCommentArgs>(
  "comments/update",
  async (payload, { rejectWithValue }) => {
    const { data: comment, error } = await supabase
      .from("comments")
      .select("image")
      .eq("id", payload.id)
      .single();

    if (error || !comment) return rejectWithValue("Comment not found");

    let image = comment.image;

    // Replace image
    if (payload.image) {
      await deleteImageIfExists({
        image: comment.image,
        bucketName: "comment-images",
      });

      const imageName = getImageName(payload.image);
      const { error: uploadError } = await supabase.storage
        .from("comment-images")
        .upload(imageName, payload.image);

      if (uploadError) {
        return rejectWithValue("Failed to upload image");
      }

      image = getPublicImageUrl({ imageName, bucketName: "comment-images" });
    }

    // Remove image
    if (comment.image && payload.removeImage) {
      await deleteImageIfExists({
        image: comment.image,
        bucketName: "comment-images",
      });
      image = "";
    }

    const { data: updated, error: updateError } = await supabase
      .from("comments")
      .update({
        content: payload.content,
        image,
      })
      .eq("id", payload.id)
      .select()
      .single();

    if (updateError) {
      return rejectWithValue("Failed updating this comment");
    }

    return updated;
  },
);

export const deleteComment = createAsyncThunk<string, string>(
  "comments/delete",
  async (id, { rejectWithValue }) => {
    // 1. Get the comment to find its image
    const { data: image, error } = await supabase
      .from("comments")
      .select("image")
      .eq("id", id)
      .single();
    console.log(image);
    if (error) return rejectWithValue("Can't find this comment");

    // 2. Delete the image from storage if it exists
    await deleteImageIfExists({
      image: image.image,
      bucketName: "comment-images",
    });

    // 3. Get comment images
    const { data: comments, error: commentsError } = await supabase
      .from("comments")
      .select("image")
      .eq("parent_id", id)
      .not("image", "is", null);

    if (commentsError) throw new Error("Failed to fetch comment images");

    const imagePaths =
      comments?.map((c) => c.image?.split("/").at(-1)).filter(Boolean) || [];

    // 4. Delete comment images
    if (imagePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("comment-images")
        .remove(imagePaths);

      if (storageError) throw new Error("Failed to delete comment images");
    }

    // 5. Delete the comment from DB
    const { error: dbError } = await supabase
      .from("comments")
      .delete()
      .eq("id", id);

    if (dbError) return rejectWithValue("Failed to delete comment");

    return id;
  },
);
