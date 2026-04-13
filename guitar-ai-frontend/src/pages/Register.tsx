import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Register attempt', data);
    // TODO: wire up with backend
  };

  return (
    <div className="flex min-h-screen bg-[#08060d] text-white">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black items-end overflow-hidden">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[20s] ease-out hover:scale-110"
          style={{ backgroundImage: `url('/guitar-bg.png')`, backgroundPosition: 'center 20%' }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-[#08060d]/60 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-purple-900/40 to-transparent mix-blend-multiply" />

        {/* Content */}
        <div className="relative z-20 p-16 w-full pb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Guitar AI</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 leading-tight">
            Master the fretboard. <br />
            <span className="text-purple-400">Play with passion.</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Join the ultimate AI-powered guitar learning platform. Real-time feedback, personalized lessons, and interactive tabs.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 relative selection:bg-purple-500/30">
        {/* Background glow just for the right side on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[80%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-left mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Create an Account</h2>
            <p className="text-gray-400">Start your musical journey today.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-white placeholder:text-gray-600 hover:bg-white/10"
                placeholder="John Doe"
              />
              {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message as string}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-white placeholder:text-gray-600 hover:bg-white/10"
                placeholder="you@example.com"
              />
              {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message as string}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-white placeholder:text-gray-600 hover:bg-white/10"
                placeholder="••••••••"
              />
              {errors.password && <span className="text-red-400 text-xs mt-1 block">{errors.password.message as string}</span>}
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              Sign Up
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          <p className="text-left text-sm text-gray-400 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors border-b border-transparent hover:border-purple-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
