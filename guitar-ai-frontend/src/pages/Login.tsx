import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { login } from "../store/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../store/hook";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error: backendError } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const resultAction = await dispatch(login(data));

      if (login.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Heading */}
      <div className="text-left mb-6">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-semibold text-white mb-1"
        >
          Welcome Back
        </motion.h1>
        <p className="text-gray-400 text-sm">Log in to your account.</p>
      </div>

      {/* Global Error */}
      {(errors.email || errors.password || backendError) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg text-sm mb-4"
        >
          ⚠{" "}
          {backendError ||
            "Please fill all fields correctly 🎸"}
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* EMAIL */}
        <div className="relative group">
          <input
            type="email"
            {...register("email", {
              required: "Enter your email 🎸",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
            className={`peer w-full px-4 pt-6 pb-2.5 bg-white/5 rounded-t-xl text-white placeholder-transparent transition-all border-x border-t focus:outline-none hover:bg-white/10
            ${errors.email ? "border-red-500/50" : "border-white/5"}`}
            placeholder="Email"
          />

          <label className="absolute left-4 top-2 text-[11px] text-gray-400 peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-purple-400 transition-all">
            Email
          </label>

          {/* Bottom Line */}
          <div
            className={`absolute bottom-0 left-0 w-full h-[2px] ${errors.email
              ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
              : "bg-white/10"
              }`}
          />

          {/* Error */}
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 mt-1 flex items-center gap-1"
            >
              ⚠ {errors.email.message as string}
            </motion.p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="relative group">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Enter your password 🎸",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
            })}
            className={`peer w-full pl-4 pr-12 pt-6 pb-2.5 bg-white/5 rounded-t-xl text-white placeholder-transparent transition-all border-x border-t focus:outline-none hover:bg-white/10
            ${errors.password ? "border-red-500/50" : "border-white/5"}`}
            placeholder="Password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[28px] text-gray-500 hover:text-purple-400"
          >
            👁
          </button>

          <label className="absolute left-4 top-2 text-[11px] text-gray-400 peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-purple-400 transition-all">
            Password
          </label>

          <div
            className={`absolute bottom-0 left-0 w-full h-[2px] ${errors.password
              ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
              : "bg-white/10"
              }`}
          />

          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 mt-1 flex items-center gap-1"
            >
              ⚠ {errors.password.message as string}
            </motion.p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] active:scale-[0.98]"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        {/* Divider */}
        <div className="relative my-4 flex items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="mx-4 text-gray-500 text-sm">Or</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Google */}
        <button
          type="button"
          className="w-full py-3 bg-white text-gray-900 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          🔵 Sign in with Google
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-400 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-purple-400 hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
}