import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "./supabase";
import type { Blog, CreateBlogInput } from "../features/blogs/types";

export const getBlogs = createAsyncThunk<Blog[]>(
  "blogs/get",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .range(0, 5);

    if (error) {
      return rejectWithValue("Blogs could not be loaded");
    }

    return data;
  }
);

export const createBlog = createAsyncThunk(
  "blogs/create",
  async (newBlog: CreateBlogInput, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("blogs")
      .insert({
        title: newBlog.title,
        content: newBlog.content,
        authorName: newBlog.authorName,
        authorEmail: newBlog.authorEmail,
        user_id: newBlog.user_id,
      })
      .select()
      .single();

    if (error) {
      return rejectWithValue("Failed to create blog");
    }

    return data;
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (id: string, { rejectWithValue }) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    console.log(id);
    if (error) {
      return rejectWithValue("Can't delete this blog");
    }

    return id;
  }
);
