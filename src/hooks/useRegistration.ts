import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { registerUser } from "../services/apiAuth";

type RegistrationProps = {
  fullName: string;
  email: string;
  password: string;
};

export function useRegistration() {
  const dispatch = useAppDispatch();
  const isRegistering = useAppSelector((state) => state.auth.isRegistering);

  const register = async ({ fullName, email, password }: RegistrationProps) => {
    if (!fullName || !email || !password) {
      toast.error("Please provide full name, email, and password");
      return;
    }

    try {
      await dispatch(
        registerUser({
          fullName,
          email,
          password,
        })
      ).unwrap();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { register, isRegistering };
}
