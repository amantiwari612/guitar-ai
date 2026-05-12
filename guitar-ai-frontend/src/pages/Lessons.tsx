import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hook";
import { useSelector } from "react-redux";
import { fetchVideos } from "../store/reducers/videoReducer";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import VideoCard, { type Video } from "../components/VideoCard";
import UploadVideoModal from "../components/UploadVideoModal";
import VideoPlayerModal from "../components/VideoPlayerModal";

export default function Lessons() {
  const dispatch = useAppDispatch();
  const { videos, loading, error } = useSelector((state: any) => state.video);
  const { user } = useSelector((state: any) => state.auth);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);

  useEffect(() => {
    // Fetch initial videos
    dispatch(fetchVideos({ limit: 50 }));
  }, [dispatch]);

  return (
    <div className="pb-24">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
            Video Lessons
          </h1>
          <p className="text-gray-400">
            Explore curated guitar lessons or upload your own practice sessions.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/20 transition-all whitespace-nowrap self-start sm:self-auto"
        >
          <FiPlus size={18} />
          <span>Upload Lesson</span>
        </motion.button>
      </div>

      {/* Content Section */}
      {error && (
        <div className="p-4 mb-8 text-sm text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
          Error loading videos: {error}
        </div>
      )}

      {loading && videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <svg className="animate-spin h-10 w-10 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading premium lessons...</p>
        </div>
      ) : videos.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
        >
          {videos.map((video: Video) => (
            <VideoCard
              key={video._id}
              video={video}
              currentUserId={user?._id}
              onPlayClick={(v) => setPlayingVideo(v)}
            />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-2xl border-dashed">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-gray-500">
            <FiPlus size={24} />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">No lessons found</h3>
          <p className="text-gray-400 text-sm mb-6 text-center max-w-sm">
            There are currently no video lessons available. Be the first to upload one!
          </p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors"
          >
            Upload your first video
          </button>
        </div>
      )}

      {/* Upload Modal */}
      <UploadVideoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      {/* Media Player Modal */}
      <VideoPlayerModal
        video={playingVideo}
        onClose={() => setPlayingVideo(null)}
      />
    </div>
  );
}