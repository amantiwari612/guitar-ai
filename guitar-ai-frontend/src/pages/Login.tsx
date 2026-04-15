import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const sentenceVariants: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const letterVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", damping: 10, stiffness: 200 } }
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: any) => {
    console.log('Login attempt', data);
    // TODO: wire up with backend login
  };

  return (
    <>
      <div className="text-left mb-4 sm:mb-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl sm:text-3xl font-semibold text-white mb-2"
        >
          Welcome Back
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-gray-400 text-sm">
          Log in to your account.
        </motion.p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-2">
        <div className="relative group">
          <input
            type="email"
            id="email"
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
            className="peer w-full px-4 pt-6 pb-2.5 bg-white/5 rounded-t-xl focus:outline-none transition-all text-white placeholder-transparent hover:bg-white/10 text-sm sm:text-base border-x border-t border-white/5"
            placeholder="you@example.com"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-2 text-[11px] font-medium text-gray-400 transition-all peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-purple-400 pointer-events-none"
          >
            Email
          </label>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-blue-400 to-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
          {errors.email && <span className="text-red-400 text-xs block mt-1.5">{errors.email.message as string}</span>}
        </div>

        <div className="relative group">
          <Link to="/login" className="absolute right-4 top-2 text-[11px] text-purple-400 hover:text-purple-300 font-medium transition-colors z-20 pointer-events-auto">
            Forgot?
          </Link>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            className="peer w-full pl-4 pr-12 pt-6 pb-2.5 bg-white/5 rounded-t-xl focus:outline-none transition-all text-white placeholder-transparent hover:bg-white/10 text-sm sm:text-base border-x border-t border-white/5"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[28px] text-gray-500 hover:text-purple-400 focus:outline-none transition-colors z-20"
          >
            {showPassword ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" /></svg>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
            )}
          </button>
          <label
            htmlFor="password"
            className="absolute left-4 top-2 text-[11px] font-medium text-gray-400 transition-all peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-purple-400 pointer-events-none"
          >
            Password
          </label>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-blue-400 to-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
          {errors.password && <span className="text-red-400 text-xs block mt-1.5">{errors.password.message as string}</span>}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group text-sm sm:text-base"
        >
          Log In
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Divider */}
        <div className="relative my-3 sm:my-4 flex items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink-0 mx-4 text-gray-500 text-xs sm:text-sm">Or</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full py-2.5 sm:py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg text-sm sm:text-base"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </button>
      </form>

      <p className="text-center text-xs sm:text-sm text-gray-400 mt-4 sm:mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors border-b border-transparent hover:border-purple-300">
          Sign up
        </Link>
      </p>
    </>
  );
}
