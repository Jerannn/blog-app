import { useAppDispatch, useAppSelector } from "./reduxHooks";
import toast from "react-hot-toast";
import { login as loginApi } from "../services/apiAuth";

type LoginProps = {
  email: string;
  password: string;
};

function useLogin() {
  const dispatch = useAppDispatch();
  const isLoggingIn = useAppSelector((state) => state.auth.isLoggingIn);

  const login = async ({ email, password }: LoginProps) => {
    if (!email || !password) {
      toast.error("Please provide email and password");
      return;
    }

    try {
      await dispatch(loginApi({ email, password })).unwrap();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { login, isLoggingIn };
}

export default useLogin;
