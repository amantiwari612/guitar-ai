import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { logout } from "../../store/reducers/authReducer";
import { useState } from "react";

export default function MainHeader() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = (path: string) =>
    `relative px-2 py-1 transition-all duration-200 ${location.pathname === path
      ? "text-white"
      : "text-gray-400 hover:text-white"
    }`;

  const NavLinks = () => (
    <>
      <Link to="/" className={navLinkClass("/")}>
        Dashboard
      </Link>
      <Link to="/practice" className={navLinkClass("/practice")}>
        Practice
      </Link>
      <Link to="/tuner" className={navLinkClass("/tuner")}>
        Tuner
      </Link>
      <Link to="/lessons" className={navLinkClass("/lessons")}>
        Lessons
      </Link>

      {isAuthenticated && (
        <button
          onClick={() => dispatch(logout())}
          className="mt-2 md:mt-0 md:ml-4 px-4 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all border border-red-500/20 hover:border-red-500/40"
        >
          Sign Out
        </button>
      )}
    </>
  );

  return (
    <div className="backdrop-blur-xl bg-[#08060d]/80 px-6 py-4 border-b border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 text-transparent bg-clip-text"
        >
          🎸 Guitar AI
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLinks />
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col gap-4 text-sm font-medium">
          <NavLinks />
        </nav>
      )}
    </div>
  );
}