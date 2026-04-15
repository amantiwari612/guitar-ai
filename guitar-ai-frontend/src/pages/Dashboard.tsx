export default function Dashboard() {
  return (
    <div className="animate-fade-in w-full space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold font-['Orbitron'] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Studio Dashboard</h1>
        <p className="text-gray-400 mt-2 text-sm">Welcome back, JD. Let's make some noise.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Metric Cards */}
        {[
          { label: 'Practice Time', value: '4h 20m', trend: '+12% this week', color: 'from-purple-500 to-blue-500', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]' },
          { label: 'Current Streak', value: '7 Days', trend: 'Keep it up!', color: 'from-green-500 to-emerald-500', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]' },
          { label: 'Accuracy Score', value: '94%', trend: '+3% improvement', color: 'from-orange-500 to-rose-500', glow: 'shadow-[0_0_20px_rgba(249,115,22,0.15)]' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white/5 border border-white/5 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors ${stat.glow}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity`} />
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 font-['Orbitron']">{stat.label}</h3>
            <div className="text-3xl font-bold mb-1 font-['Orbitron']">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-lg">
          <h2 className="text-xl font-bold font-['Orbitron'] mb-4">Recent Sessions</h2>
          <div className="space-y-4">
            {[
              { song: 'Stairway to Heaven (Solo)', date: 'Today, 2:00 PM', accuracy: 92 },
              { song: 'Sweet Child O\' Mine', date: 'Yesterday', accuracy: 96 },
              { song: 'Pentatonic Exercise #4', date: 'Oct 12', accuracy: 88 }
            ].map((session, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-black/40 transition-colors cursor-pointer border border-white/5">
                <div>
                  <h4 className="font-semibold text-sm max-w-[200px] truncate">{session.song}</h4>
                  <p className="text-xs text-gray-500 mt-1">{session.date}</p>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center gap-3">
                  <div className="w-full sm:w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: `${session.accuracy}%` }} />
                  </div>
                  <span className="text-xs font-bold text-gray-300 min-w-[32px] font-['Orbitron']">{session.accuracy}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#08060d] to-purple-900/30 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden flex flex-col justify-center min-h-[300px] shadow-[0_0_30px_rgba(168,85,247,0.1)]">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20 pointer-events-none" />
          <div className="absolute top-6 right-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="relative z-10 max-w-[80%]">
            <h2 className="text-xl font-bold font-['Orbitron'] mb-2">AI Instructor</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              I noticed you're struggling with the B-string bend in the sweet child solo. Want to jump into an interactive micro-lesson to perfect your pitch?
            </p>
            <button className="neon-btn font-['Orbitron']">
              Start Micro-Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
