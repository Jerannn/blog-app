import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../services/supabase";
import type { Blog } from "./types";

export const getBlogs = createAsyncThunk<Blog[]>("blogs/getBlogs", async () => {
  const { data, error } = await supabase.from("blogs").select("*");

  if (error) {
    console.log(error);
    throw new Error("Blogs could not be loaded");
  }

  return data;
});
