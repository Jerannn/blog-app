import { useState } from "react";
import useLogout from "../hooks/useLogout";
import NavItem from "./NavItem";
import { IoIosClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";

export default function NavigationBar() {
  const [isToggle, setIsToggle] = useState(false);
  const { logout } = useLogout();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;
    logout();
  };

  return (
    <>
      <RxHamburgerMenu
        className="md:hidden cursor-pointer"
        onClick={() => setIsToggle((prev) => !prev)}
      />
      <nav
        className={`flex flex-col items-end pt-10 h-dvh max-w-96 w-full fixed top-0 right-0 z-20 bg-white  transform  ${
          isToggle
            ? "translate-x-0 transition-transform duration-300"
            : "translate-x-full"
        }   md:static md:flex-row md:h-auto md:max-w-none md:w-auto md:items-center md:pt-0 md:bg-transparent md:translate-x-0 md:transition-none`}
      >
        <IoIosClose
          size={30}
          onClick={() => setIsToggle((prev) => !prev)}
          className="me-3 mb-3 cursor-pointer rounded-full hover:bg-slate-200 duration-200 md:hidden"
        />

        <NavItem to="dashboard">Dashboard</NavItem>
        <NavItem to="create-blog">Create Blog</NavItem>

        <button
          onClick={handleLogout}
          className="ms-5 mt-4 me-3 md:mt-0 md:me-0"
        >
          <CiLogout size={30} color="#935900" className="cursor-pointer " />
        </button>
      </nav>
    </>
  );
}
