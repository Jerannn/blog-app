import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import useLogin from "../hooks/useLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("jeranpogi@gmail.com");
  const [password, setPassword] = useState("jeranpogi123");

  const { login, isLoggingIn } = useLogin();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login({ email, password });

    if (success) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="max-w-xl  p-10 m-auto bg-white ">
      <h1 className="text-slate-800 text-2xl font-semibold mb-1">
        Login to Your Account
      </h1>
      <h3 className="  text-slate-700">Access your account</h3>

      <form onSubmit={handleLogin} className="flex flex-col gap-7 mt-5">
        {/* Email */}
        <div className="flex items-center border border-slate-300 rounded-sm h-11 py-1">
          <div className="flex items-center h-full border-r border-slate-300 pr-3 ps-3">
            <MdEmail color="#314158" />
          </div>
          <input
            type="text"
            name="fullname"
            placeholder="Enter your email"
            className="w-full ps-3  p-1  text-sm text-slate-800  placeholder:text-slate-400 outline-0 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex items-center border border-slate-300 rounded-sm h-11 py-1">
          <div className="flex items-center h-full border-r border-slate-300 pr-3 ps-3">
            <IoIosLock color="#314158" />
          </div>
          <input
            type="password"
            name="fullname"
            placeholder="Create a password"
            className="w-full ps-3  p-1  text-sm text-slate-800  placeholder:text-slate-400 outline-0 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700"
          isDisabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-6 p-2 pt-7 flex justify-center gap-1 border-t border-slate-300">
        <p className="text-slate-700 font-medium">Don't have an account?</p>
        <Link to="/register" className="text-blue-600 font-semibold">
          Register
        </Link>
      </div>
    </div>
  );
}
