import { useAppSelector } from "../hooks/reduxHooks";

export default function User() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <p className="mb-5 font-semibold text-slate-700">
      Welcome, {user?.fullName}
    </p>
  );
}
