import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "./Loading";
import { useUser } from "../hooks/useUser";

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const navigate = useNavigate();
  const { authChecked, isAuthenticated, isLoading } = useUser();

  // Check if there's a user authenticated => if YES, redirect to the dashboard
  useEffect(() => {
    if (authChecked && isAuthenticated)
      navigate("/dashboard", { replace: true });
  }, [authChecked, isAuthenticated, navigate]);

  // display loading screen
  if (isLoading) return <Loading />;

  // Only unauthenticated user can see login/register
  return children;
}
