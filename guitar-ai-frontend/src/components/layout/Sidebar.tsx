import { Link, useLocation } from 'react-router-dom';

const items = [
  { name: 'Studio', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', path: '/dashboard' },
  { name: 'Lessons', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', path: '/lessons' },
  { name: 'Repertoire', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3', path: '/repertoire' },
  { name: 'Tuner', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', path: '/tuner' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#08060d]/90 backdrop-blur-3xl border-r border-white/10 hidden md:flex flex-col h-full relative z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <span className="font-bold text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-['Orbitron']">Guitar AI</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              )}
              <svg className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'group-hover:text-purple-400 transition-colors'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="font-medium text-sm font-['Orbitron']">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5">
        <div className="bg-white/5 rounded-xl p-4 border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-colors cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h4 className="text-sm font-bold text-white mb-1 font-['Orbitron']">Go PRO</h4>
          <p className="text-xs text-gray-400 mb-3">Unlock advanced AI analysis.</p>
          <button className="w-full py-2 bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold rounded-lg transition-colors shadow-[0_0_10px_rgba(168,85,247,0.4)] hover:shadow-[0_0_15px_rgba(168,85,247,0.6)]">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
