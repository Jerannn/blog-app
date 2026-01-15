import { createSlice } from "@reduxjs/toolkit";
import type { AuthType } from "./types";
import {
  getCurrentUser,
  login,
  logout,
  registerUser,
} from "../../services/apiAuth";
import toast from "react-hot-toast";

interface AuthState {
  user: AuthType | null;
  authChecked: boolean;
  isLoading: boolean;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isFetchingUser: boolean;
  isLoggingOut: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  authChecked: false,
  isLoading: false,
  isLoggingIn: false,
  isRegistering: false,
  isFetchingUser: false,
  isLoggingOut: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegistering = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegistering = false;
        state.user = action.payload;
        state.authChecked = true;
        toast.success("Registered successfully");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegistering = false;
        state.authChecked = true;
        toast.error(action.payload as string);
      })

      // login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.user = action.payload;
        state.authChecked = true;
        toast.success(`Welcome, ${state.user.fullName}`);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.authChecked = true;
        toast.error(action.error.message as string);
      })

      // get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isFetchingUser = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isFetchingUser = false;
        state.authChecked = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isFetchingUser = false;
        state.user = null;
        state.authChecked = true;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.isLoggingOut = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggingOut = false;
        state.authChecked = false;
        toast.success("Logout successfully!");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggingOut = false;
        toast.error(action.error.message as string);
      });
  },
});

export default authSlice.reducer;
