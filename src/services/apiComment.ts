import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "./supabase";
import type { Comment } from "../features/comments/types";

type CommentArgs = {
  post_id?: string;
  parent_id: string | null;
  content: string;
  image?: File | null;
  authorName?: string;
};

export const getComments = createAsyncThunk<Comment[], string>(
  "comments/get",
  async (postId, { rejectWithValue }) => {
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId);

    console.log(comments);

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
      ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/comment-images/${imageName}`
      : null;

    // 1. Add comment
    const { data, error } = await supabase
      .from("comments")
      .insert([{ ...newComment, image: imagePath }])
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
