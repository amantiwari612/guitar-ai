import { Link, useOutlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

const floatingNotes = ["🎵", "🎶", "𝄞", "♩", "♪", "♫", "♬"];

const MusicBurst = () => {
  return (
    <div className="absolute top-1/2 left-1/2 pointer-events-none z-50">
      {[...Array(12)].map((_, i) => {
        const randomX = (Math.random() - 0.5) * 500;
        const randomY = -150 - Math.random() * 300;
        const duration = 1.5 + Math.random() * 1.5;
        const note = floatingNotes[Math.floor(Math.random() * floatingNotes.length)];

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0, x: 0, scale: 0.2, rotate: 0 }}
            animate={{
              opacity: [0, 0.9, 0],
              y: randomY,
              x: randomX,
              scale: 1 + Math.random() * 0.8,
              rotate: (Math.random() - 0.5) * 120
            }}
            transition={{
              duration: duration,
              ease: "easeOut",
              delay: Math.random() * 0.2
            }}
            className="absolute text-purple-400/80 text-4xl drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] font-sans"
          >
            {note}
          </motion.div>
        );
      })}
    </div>
  );
};

export default function AuthLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  const flipVariants: Variants = {
    initial: {
      rotateY: 60,
      opacity: 0,
      scale: 0.96,
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
    exit: {
      rotateY: -60,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
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
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#08060d]/80 via-[#08060d]/20 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-purple-500/20 to-transparent mix-blend-overlay" />

        {/* Content */}
        <div className="relative z-20 p-16 w-full pb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <span className="guitar-title">Guitar AI</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname + "-text"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 leading-tight">
                {location.pathname === '/login' ? (
                  <>
                    Welcome back to <br />
                    <span className="text-purple-400">the stage.</span>
                  </>
                ) : (
                  <>
                    Master the fretboard. <br />
                    <span className="text-purple-400">Play with passion.</span>
                  </>
                )}
              </h1>
              <p className="text-lg text-gray-300 max-w-md">
                {location.pathname === '/login'
                  ? "Pick up right where you left off. Access your personalized lessons and track your progress."
                  : "The ultimate AI-powered guitar learning platform. Real-time feedback, personalized lessons, and interactive tabs."}
              </p>
            </motion.div>
            <motion.div key={location.pathname + "-burst-left"}>
              <MusicBurst />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative selection:bg-purple-500/30 overflow-hidden lg:overflow-visible" style={{ perspective: '1200px' }}>

        {/* Floating Back to Home Button */}
        <Link
          to="/"
          className="absolute top-6 right-6 lg:top-8 lg:right-8 z-50 flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-gray-400 hover:text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          title="Back to Home"
        >
          <FiHome className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wide uppercase mt-0.5">Home</span>
        </Link>

        {/* Mobile Background Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center lg:hidden"
          style={{ backgroundImage: `url('/guitar-bg.png')`, backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 z-0 bg-[#08060d]/50 lg:hidden" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[80%] h-[50%] rounded-full bg-purple-600/20 blur-[100px]" />
        </div>

        {/* 3D Flipping Card Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={flipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-md relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl p-6 sm:p-8 rounded-3xl"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
