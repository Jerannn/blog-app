import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <main className=" bg-slate-100 grow">
        <Outlet />
      </main>
    </div>
  );
}
