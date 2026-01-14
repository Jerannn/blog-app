import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { getCurrentUser } from "../services/apiAuth";

export function useUser() {
  const dispatch = useAppDispatch();
  const { user, authChecked, isFetchingUser } = useAppSelector(
    (state) => state.auth
  );

  // get user data
  useEffect(() => {
    if (!authChecked) dispatch(getCurrentUser());
  }, [dispatch, authChecked]);

  return {
    authChecked,
    isFetchingUser,
    isAuthenticated: user?.role === "authenticated",
  };
}
