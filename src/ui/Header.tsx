import { Link } from "react-router-dom";
import { MdOutlineNewspaper } from "react-icons/md";
import NavigationBar from "./NavigationBar";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-3 border-b-2 border-slate-200">
      <Link
        to="/"
        className="flex gap-1 items-center text-slate-800 text-2xl font-extrabold"
      >
        <MdOutlineNewspaper color="#fe9a00" size={40} />
        Blog
      </Link>
      <NavigationBar />
    </header>
  );
}
