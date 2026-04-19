import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { logout } from "../../store/reducers/authReducer";

export default function MainHeader() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const navLinkClass = (path: string) =>
    `relative px-2 py-1 transition-all duration-200 ${location.pathname === path
      ? "text-white"
      : "text-gray-400 hover:text-white"
    }`;

  return (
    <div className="backdrop-blur-xl bg-[#08060d]/80 px-6 py-4 flex justify-between items-center border-b border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">

      <Link
        to="/"
        className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 text-transparent bg-clip-text hover:opacity-80 transition"
      >
        🎸 Guitar AI
      </Link>

      <nav className="flex items-center gap-8 text-sm font-medium">

        <Link to="/" className={navLinkClass("/")}>
          Dashboard
          {location.pathname === "/" && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          )}
        </Link>

        <Link to="/practice" className={navLinkClass("/practice")}>
          Practice
          {location.pathname === "/practice" && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          )}
        </Link>

        <Link to="/tuner" className={navLinkClass("/tuner")}>
          Tuner
          {location.pathname === "/tuner" && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          )}
        </Link>

        <Link to="/lessons" className={navLinkClass("/lessons")}>
          Lessons
          {location.pathname === "/lessons" && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          )}
        </Link>

        {isAuthenticated && (
          <button
            onClick={() => dispatch(logout())}
            className="ml-4 px-4 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all border border-red-500/20 hover:border-red-500/40 shadow-sm hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]"
          >
            Sign Out
          </button>
        )}
      </nav>
    </div>
  );
}