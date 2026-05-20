import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOOD_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "bhajan", label: "Bhajans" },
  { id: "sufi", label: "Sufi" },
  { id: "instrumental", label: "Instrumental" },
  { id: "classical", label: "Classical" },
  { id: "lofi", label: "Lofi & Chill" }
];

const MOOD_VIDEOS = [
  // Bhajans
  {
    id: "bhajan_1",
    title: "Shri Krishna Flute Music - Relaxing Meditation Bhajan",
    embedUrl: "https://www.youtube.com/embed/t-lg_Fe8NDc",
    genre: "bhajan"
  },
  {
    id: "bhajan_2",
    title: "Morning Shiv Bhajan - Peaceful Chants & Aura",
    embedUrl: "https://www.youtube.com/embed/7Wy7QsRalfE",
    genre: "bhajan"
  },
  {
    id: "bhajan_3",
    title: "2 Hours Relaxing Music for Meditation & Sleep ",
    embedUrl: "https://www.youtube.com/embed/KanZi8fFgiA",
    genre: "classical"
  },
  // Sufi
  {
    id: "sufi_1",
    title: "Best of Nusrat Fateh Ali Khan - Healing Sufi Hits",
    embedUrl: "https://www.youtube.com/embed/CVq-SnxEDSs",
    genre: "sufi"
  },
  {
    id: "sufi_2",
    title: "Kun Faya Kun - Peaceful Sufi Music",
    embedUrl: "https://www.youtube.com/embed/T94PHkuydcw",
    genre: "sufi"
  },
  // Instrumental
  {
    id: "inst_1",
    title: "Sunset Raaga - Indian Classical Instrumental for Peace",
    embedUrl: "https://www.youtube.com/embed/hiwnC_yiMno",
    genre: "instrumental"
  },
  {
    id: "inst_2",
    title: "Relax Your Mind Instantly | Indian Ancient Chill",
    embedUrl: "https://www.youtube.com/embed/NwfPMFxkfoI",
    genre: "instrumental"
  },
  {
    id: "inst_3",
    title: "Relaxing Guitar Music, Acoustic - Calming Music",
    embedUrl: "https://www.youtube.com/embed/lTRiuFIWV54",
    genre: "instrumental"
  },
  // Lofi
  {
    id: "lofi_1",
    title: "lofi hip hop radio - beats to relax/study to",
    embedUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    genre: "lofi"
  },
  {
    id: "lofi_2",
    title: "Night City - Lofi Hip Hop / Relaxing Beats",
    embedUrl: "https://www.youtube.com/embed/77ZozI0rw7w",
    genre: "lofi"
  }
];

export default function MoodSwing() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const getYoutubeId = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setPlayingVideoId(null); // Stop playing video when category changes
  };

  const filteredVideos = MOOD_VIDEOS.filter(
    (video) => activeCategory === "all" || video.genre === activeCategory
  );

  return (
    <div className="pb-24">
      {/* Header Section */}
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
          Mood Swing
        </h1>
        <p className="text-gray-400 mb-6">
          Relax your mind with curated calming music, bhajans, and sufi sessions.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {MOOD_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={video.id}
              whileHover={{ y: -5 }}
              className="group relative bg-[#130f1c] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 shadow-lg hover:shadow-purple-500/10"
            >
              <div className="aspect-video w-full relative overflow-hidden">
                {playingVideoId === video.id ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${video.embedUrl}?autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full absolute inset-0"
                  ></iframe>
                ) : (
                  <div
                    className="w-full h-full absolute inset-0 cursor-pointer group-hover:scale-105 transition-transform duration-500"
                    onClick={() => setPlayingVideoId(video.id)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${getYoutubeId(video.embedUrl)}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-purple-500/80 group-hover:border-purple-400 transition-all shadow-[0_0_20px_rgba(168,85,247,0)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-400 uppercase tracking-wider">
                    {MOOD_CATEGORIES.find((c) => c.id === video.genre)?.label}
                  </span>
                </div>
                <h3 className="text-white font-medium line-clamp-2 text-sm sm:text-base">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
