import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { MdOutlineNewspaper } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import useLogout from "../hooks/useLogout";

export default function Header() {
  const { logout } = useLogout();
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) return;

    logout();
  };

  return (
    <header className="flex justify-between items-center p-3 border-b-2 border-slate-200">
      <Link
        to="/"
        className="flex gap-1 items-center text-slate-800 text-2xl font-extrabold"
      >
        <MdOutlineNewspaper color="#fe9a00" size={40} /> Blog
      </Link>
      <nav className="flex items-center">
        <NavItem to="dashboard">Dashboard</NavItem>
        <NavItem to="create-blog">Create Blog</NavItem>
        <button onClick={handleLogout} className="ms-5">
          <CiLogout size={30} color="#935900" className="cursor-pointer " />
        </button>
      </nav>
    </header>
  );
}
