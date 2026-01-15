import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "./supabase";
import type { AuthType } from "../features/auth/types";

type RegisterArgs = {
  email: string;
  password: string;
  fullName: string;
};

type LoginArgs = {
  email: string;
  password: string;
};

export const registerUser = createAsyncThunk<AuthType, RegisterArgs>(
  "auth/register",
  async ({ email, password, fullName }, { rejectWithValue }) => {
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
      role: data.user.role || "",
    };

    return user;
  }
);

export const login = createAsyncThunk<AuthType, LoginArgs>(
  "auth/login",
  async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error("Login failed");

    const user = {
      id: data.user.id,
      fullName: data.user.user_metadata.full_name || "",
      email: data.user.email || "",
      role: data.user.role || "",
    };

    return user;
  }
);

export const getCurrentUser = createAsyncThunk<AuthType>(
  "auth/user",
  async (_, { rejectWithValue }) => {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) rejectWithValue("There's no authenticated user!");

    const { data, error } = await supabase.auth.getUser();

    if (error) return rejectWithValue(error.message);

    const user = {
      id: data.user.id,
      fullName: data.user.user_metadata.full_name || "",
      email: data.user.email || "",
      role: data.user.role || "",
    };

    return user;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("Can't logout, something went wrong.");
});
