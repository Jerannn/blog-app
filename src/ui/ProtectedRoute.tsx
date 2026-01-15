import { useEffect } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import CenterContent from "./CenterContent";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { authChecked, isAuthenticated, isFetchingUser } = useUser();

  // If there is NO user authenticated, redirect to the /login
  useEffect(() => {
    if (authChecked && !isAuthenticated && !isFetchingUser)
      navigate("/login", { replace: true });
  }, [authChecked, isAuthenticated, isFetchingUser, navigate]);

  // display loading screen
  if (isFetchingUser)
    return (
      <CenterContent>
        <Loading />
      </CenterContent>
    );

  // Display the dashboard
  if (isAuthenticated) return children;
}
