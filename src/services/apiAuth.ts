import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "./supabase";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      fullName,
    }: {
      email: string;
      password: string;
      fullName: string;
    },
    { rejectWithValue }
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: undefined,
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) return rejectWithValue(error.message);
    if (!data.user) return rejectWithValue("User not created");

    const user = {
      id: data.user.id,
      email: data.user.email || "",
      fullName: data.user.user_metadata?.full_name || "",
      isAuthenticated: data.user.role || "",
    };

    console.log("Registered user:", user);
    return user;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    console.log(data);

    const user = {
      id: data.user.id,
      fullName: data.user.user_metadata.full_name || "",
      email: data.user.email || "",
      isAuthenticated: data.user.role || "",
    };

    return user;
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    console.log(data);

    if (error) throw new Error(error.message);

    const user = {
      id: data.user.id,
      fullName: data.user.user_metadata.full_name || "",
      email: data.user.email || "",
      isAuthenticated: data.user.role || "",
    };

    console.log(user);

    return user;
  }
);
