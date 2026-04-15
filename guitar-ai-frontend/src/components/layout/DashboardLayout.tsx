import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#08060d] overflow-hidden text-white w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 w-full overflow-hidden relative">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 relative">
          {/* Subtle background ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="relative z-10 w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
