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
  isLoading: boolean;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isFetchingUser: boolean;
  isLoggingOut: boolean;
  error: string | null;
  authChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isLoggingIn: false,
  isRegistering: false,
  isFetchingUser: false,
  isLoggingOut: false,
  error: null,
  authChecked: false,
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
        toast.success("Registered successfully");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegistering = false;
        toast.error(action.payload as string);
      })

      // login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.user = action.payload;
        toast.success(`Welcome, ${state.user.fullName}`);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
        console.log(action);
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
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isFetchingUser = false;
        state.user = null;
        state.error = action.payload as string;
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
