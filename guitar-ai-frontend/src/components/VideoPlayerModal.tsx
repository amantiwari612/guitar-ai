import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiEye, FiHeart } from "react-icons/fi";
import { type Video } from "./VideoCard";
import { getVideoById } from "../services/videoServices";

interface VideoPlayerModalProps {
  video: Video | null;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDetails, setVideoDetails] = useState<any>(null);

  useEffect(() => {
    if (video) {
      setVideoDetails(video); // render immediately with known details
      getVideoById(video._id)
        .then((res) => {
          if (res.data?.data) {
            setVideoDetails(res.data.data);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch video details", err);
        });
    } else {
      setVideoDetails(null);
    }
  }, [video]);

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number) => {
    if (!seconds) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {videoDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-[#120e1c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-bold text-white truncate pr-4">{videoDetails.title}</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5 flex-shrink-0"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full bg-black aspect-video flex items-center justify-center">
              <video
                ref={videoRef}
                src={videoDetails.videoFile}
                className="w-full h-full outline-none"
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
              />
            </div>

            {/* Details */}
            <div className="p-6 bg-[#120e1c]">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                {videoDetails.description}
              </p>
              <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <FiEye size={14} />
                  <span>{videoDetails.views} views</span>
                </div>
                {videoDetails.likesCount !== undefined && (
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <FiHeart size={14} className={videoDetails.isLiked ? "text-red-500 fill-red-500" : ""} />
                    <span>{videoDetails.likesCount} likes</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <FiClock size={14} />
                  <span>{formatDuration(videoDetails.duration)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoPlayerModal;
