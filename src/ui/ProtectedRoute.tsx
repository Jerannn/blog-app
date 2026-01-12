import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Loading from "./Loading";
import { getCurrentUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, authChecked } = useAppSelector(
    (state) => state.auth
  );

  //   if (!user) dispatch(getCurrentUser());
  // get user data
  useEffect(() => {
    if (!authChecked) dispatch(getCurrentUser());
  }, [dispatch, authChecked]);

  // If there is NO user or authenticated, redirect to the /login
  useEffect(() => {
    if (authChecked && !user) navigate("/login");
  }, [user, authChecked, navigate]);

  // display loading screen
  if (!authChecked || isLoading) return <Loading />;

  return children;
}
