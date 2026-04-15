export default function Navbar() {
  return (
    <header className="h-20 bg-[#08060d]/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex-1 max-w-xl hidden md:flex">
        <div className="relative w-full group">
          <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search lessons, tabs, chords..." 
            className="w-full bg-white/5 border border-white/5 rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all font-['Orbitron']"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-bold hover:bg-green-500/20 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]" />
          Connect Amp
        </button>
        
        <button className="relative w-10 h-10 rounded-full border border-white/10 hover:border-purple-500/50 transition-colors overflow-hidden group">
          <div className="w-full h-full bg-[#1a1028] flex items-center justify-center">
            <span className="text-sm font-bold text-gray-300 group-hover:text-white font-['Orbitron']">JD</span>
          </div>
        </button>
      </div>
    </header>
  );
}
