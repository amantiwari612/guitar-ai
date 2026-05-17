import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiPlay, FiClock, FiEye } from "react-icons/fi";
import { useAppDispatch } from "../store/hook";

export interface Video {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  duration: number;
  views: number;
  createdAt: string;
  owner?: string;
}

interface VideoCardProps {
  video: Video;
  currentUserId?: string;
  onPlayClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, currentUserId, onPlayClick }) => {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const canDelete = !currentUserId || video.owner === currentUserId;


  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number) => {
    if (!seconds) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const dateStr = new Date(video.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-purple-500/10 hover:border-white/20 transition-all duration-300 relative"
    >
      {/* Video Thumbnail Container */}
      <div
        className="relative aspect-video bg-black/50 cursor-pointer overflow-hidden group/player"
        onClick={() => onPlayClick(video)}
      >
        <video
          src={video.videoFile}
          className="w-full h-full object-cover pointer-events-none"
          preload="metadata"
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover/player:bg-black/50 z-20">
          <div className="w-14 h-14 rounded-full bg-purple-600/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg shadow-purple-900/50 transform group-hover/player:scale-110 transition-transform">
            <FiPlay size={24} className="ml-1" />
          </div>
        </div>

        {/* Top Gradient & Delete Button */}


        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-xs font-medium text-white flex items-center gap-1.5 z-30">
          <FiClock size={12} className="text-gray-300" />
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white line-clamp-1 mb-1">
          {video.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">
          {video.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <FiEye size={14} />
            <span>{video.views} views</span>
          </div>
          <span>{dateStr}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
