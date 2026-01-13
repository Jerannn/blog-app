import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "./supabase";
import type { Blog, CreateBlogInput } from "../features/blogs/types";

export const getBlogs = createAsyncThunk<Blog[]>("blogs/getBlogs", async () => {
  const { data, error } = await supabase.from("blogs").select("*");

  if (error) {
    console.log(error);
    throw new Error("Blogs could not be loaded");
  }

  return data;
});

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (data: CreateBlogInput) => {
    console.log(data);
  }
);
