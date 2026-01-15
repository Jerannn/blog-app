import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "./Loading";
import { useUser } from "../hooks/useUser";
import CenterContent from "./CenterContent";

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const navigate = useNavigate();
  const { authChecked, isAuthenticated, isFetchingUser } = useUser();

  // Check if there's a user authenticated => if YES, redirect to the dashboard
  useEffect(() => {
    if (authChecked && isAuthenticated && !isFetchingUser)
      navigate("/dashboard", { replace: true });
  }, [authChecked, isAuthenticated, isFetchingUser, navigate]);

  // display loading screen
  if (isFetchingUser)
    return (
      <CenterContent>
        <Loading />
      </CenterContent>
    );

  // Only unauthenticated user can see login/register
  if (!isAuthenticated) return children;
}
