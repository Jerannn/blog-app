import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./reduxHooks";
import { logout as logoutApi } from "../services/apiAuth";
import { resetState } from "../features/blogs/BlogSlice";

function useLogout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = async () => {
    await dispatch(logoutApi()).unwrap();
    dispatch(resetState());
    navigate("/login", { replace: true });
  };

  return { logout };
}

export default useLogout;
