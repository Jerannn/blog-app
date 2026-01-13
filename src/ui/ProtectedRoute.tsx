import { useEffect } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { authChecked, isAuthenticated, isLoading } = useUser();

  // If there is NO user authenticated, redirect to the /login
  useEffect(() => {
    if (authChecked && !isAuthenticated) navigate("/login", { replace: true });
  }, [authChecked, isAuthenticated, navigate]);

  // display loading screen
  if (isLoading) return <Loading />;

  // Display the dashboard
  if (isAuthenticated) return children;
}
