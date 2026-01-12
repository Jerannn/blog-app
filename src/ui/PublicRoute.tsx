import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { getCurrentUser } from "../services/apiAuth";
import Loading from "./Loading";

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, authChecked, isLoading } = useAppSelector(
    (state) => state.auth
  );

  // Check if has user authenticated
  useEffect(() => {
    if (!authChecked) dispatch(getCurrentUser());
  }, [dispatch, authChecked]);

  // If user exists => redirect to dashboard
  useEffect(() => {
    if (authChecked && user) navigate("/dashboard");
  }, [authChecked, user, navigate]);

  // Display loading screen while checking the auth
  if (!authChecked || isLoading) return <Loading />;

  // Only unauthenticated user can see login/register
  return children;
}
