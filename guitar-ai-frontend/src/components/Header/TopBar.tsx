import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hook";
import { motion } from "framer-motion";

export default function Topbar() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="backdrop-blur-xl bg-black/60 text-gray-300 text-xs sm:text-sm px-6 py-2 flex justify-between items-center border-b border-white/10">

      {/* 🎸 Left */}
      <div className="flex items-center gap-4">

        <span className="hidden sm:block text-gray-500">
          Learn • Practice • Play
        </span>
      </div>

      {/* 🔗 Right */}
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="px-3 py-1 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium hover:opacity-90 transition shadow-[0_0_10px_rgba(168,85,247,0.4)]"
            >
              Register
            </Link>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
          >
            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </span>

            <span className="text-white text-xs sm:text-sm font-medium">
              {user?.name}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}