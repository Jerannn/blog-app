import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { useState } from "react";
import { registerUser } from "../services/apiAuth";

export default function RegistrationPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(fullName, email, password);
    if (fullName && email && password) {
      dispatch(
        registerUser({
          fullName,
          email,
          password,
        })
      );
    }
  };

  return (
    <div className="max-w-xl  p-10 m-auto bg-white ">
      <h1 className="text-slate-800 text-2xl font-semibold mb-1">
        Register Account
      </h1>
      <h3 className=" text-slate-700">Create your account</h3>

      <form onSubmit={handleRegistration} className="flex flex-col gap-7 mt-5">
        {/* Full Name */}
        <div className="flex items-center border border-slate-300 rounded-sm h-11 py-1">
          <div className="flex items-center h-full border-r border-slate-300 pr-3 ps-3">
            <FaUser color="#314158" />
          </div>
          <input
            type="text"
            name="fullname"
            placeholder="Enter your full name"
            className="w-full ps-3  p-1  text-sm text-slate-800  placeholder:text-slate-400 outline-0 "
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

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

        <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
          Sign Up
        </Button>
      </form>

      <div className="mt-6 p-2 pt-7 flex justify-center gap-1 border-t border-slate-300">
        <p className="text-slate-700 font-medium">Already have an account?</p>
        <Link to="/login" className="text-blue-600 font-semibold">
          Login
        </Link>
      </div>
    </div>
  );
}
