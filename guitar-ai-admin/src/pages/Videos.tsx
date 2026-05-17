import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { type AppDispatch, type RootState } from '../store';
import { getAllVideos, deleteVideo } from '../store/slices/videoSlice';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import UploadVideoModal from '../components/UploadVideoModal';

const Videos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { videos, isLoading, error } = useSelector((state: RootState) => state.videos);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    dispatch(deleteVideo(id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Videos Management</h1>
        <p className="text-gray-500 text-sm mt-1">Manage platform video lessons.</p>
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

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : videos?.totalVideos === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
          No videos available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos?.videos?.map((video) => (
            <div key={video._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="aspect-video bg-gray-900 relative">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                ) : (
                  <video src={video.videoFile} className="w-full h-full object-cover" controls preload="metadata" />
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">{video.description}</p>

                <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete Video"
                  >
                    <MdDelete className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <UploadVideoModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </div>
  );
};

export default Videos;
