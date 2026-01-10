import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { MdOutlineNewspaper } from "react-icons/md";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-3 border-b-2 border-slate-200">
      <Link
        to="/"
        className="flex gap-1 items-center text-slate-800 text-2xl font-extrabold"
      >
        <MdOutlineNewspaper color="#fe9a00" size={40} /> Blog
      </Link>
      <nav>
        <NavItem to="dashboard">Dashboard</NavItem>
        <NavItem to="create-blog">Create Blog</NavItem>
        <NavItem to="logout">Logout</NavItem>
      </nav>
    </header>
  );
}
