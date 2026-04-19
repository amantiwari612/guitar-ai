import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#08060d] text-white overflow-x-hidden relative">
      <Header />
      <main className="flex-1 pt-36 px-6 w-full">
        <Outlet />
      </main>
    </div>
  );
}
