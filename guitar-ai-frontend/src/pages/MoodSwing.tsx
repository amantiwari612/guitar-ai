import { motion } from "framer-motion";

const MOOD_VIDEOS = [
  {
    id: "jfKfPfyJRdk",
    title: "lofi hip hop radio - beats to relax/study to",
    embedUrl: "https://www.youtube.com/embed/jfKfPfyJRdk"
  },
  {
    id: "lTRiuFIWV54",
    title: "Relaxing Guitar Music, Acoustic - Calming Music for Stress Relief",
    embedUrl: "https://www.youtube.com/embed/lTRiuFIWV54"
  },
  {
    id: "1zyhQjJ5RqY",
    title: "Beautiful Relaxing Acoustic Guitar Music",
    embedUrl: "https://www.youtube.com/embed/1zyhQjJ5RqY"
  },
  {
    id: "ss7EJ-PW2Uk",
    title: "Relaxing Piano & Soft Guitar Music",
    embedUrl: "https://www.youtube.com/embed/ss7EJ-PW2Uk"
  },
  {
    id: "77ZozI0rw7w",
    title: "Night City - Lofi Hip Hop / Relaxing Beats",
    embedUrl: "https://www.youtube.com/embed/77ZozI0rw7w"
  },
  {
    id: "9FvvbVI5rYA",
    title: "Cozy Coffee Shop ☕ Relaxing Jazz & Bossa Nova",
    embedUrl: "https://www.youtube.com/embed/9FvvbVI5rYA"
  }
];

export default function MoodSwing() {
  return (
    <div className="pb-24">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
            Mood Swing
          </h1>
          <p className="text-gray-400">
            Relax your mind with curated calming music and guitar sessions.
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {MOOD_VIDEOS.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ y: -5 }}
            className="group relative bg-[#130f1c] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10"
          >
            <div className="aspect-video w-full relative">
              <iframe
                width="100%"
                height="100%"
                src={video.embedUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full absolute inset-0"
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-white font-medium line-clamp-2 text-sm sm:text-base">
                {video.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
