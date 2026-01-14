import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import toast from "react-hot-toast";
import { login as loginApi } from "../services/apiAuth";
import { useEffect } from "react";

type LoginProps = {
  email: string;
  password: string;
};

function useLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoggingIn } = useAppSelector((state) => state.auth);

  const login = async ({ email, password }: LoginProps) => {
    if (!email || !password) {
      toast.error("Please provide email and password");
      return;
    }

    try {
      await dispatch(loginApi({ email, password }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [navigate, user]);

  return { login, isLoggingIn };
}

export default useLogin;
