import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};

export default function NavItem({ to, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 w-full text-right  md:text-center  md:w-auto text-sm font-medium transition duration-150 ease-in-out ${
          isActive
            ? "text-amber-500 border-b-2 border-b-amber-500"
            : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
