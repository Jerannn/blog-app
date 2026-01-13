import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getCurrentUser } from "../services/apiAuth";

export function useUser() {
  const dispatch = useAppDispatch();
  const { user, authChecked, isLoading } = useAppSelector(
    (state) => state.auth
  );

  // get user data
  useEffect(() => {
    if (!authChecked) dispatch(getCurrentUser());
  }, [dispatch, authChecked]);

  return {
    authChecked,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
  };
}
