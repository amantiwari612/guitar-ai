import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { MdDelete } from 'react-icons/md';

interface Video {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  createdAt: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await api.get('/videos');
        setVideos(response.data.data || []);
      } catch (err) {
        const error = err as any;
        setError(error.response?.data?.message || 'Failed to fetch videos');
      } finally {
        setIsLoading(false);
      }
    };
    loadVideos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    
    try {
      await api.delete(`/videos/${id}`);
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      const error = err as any;
      alert(error.response?.data?.message || 'Failed to delete video');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Videos Management</h1>
        <p className="text-gray-500 text-sm mt-1">Manage platform video lessons.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : videos.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
          No videos available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="aspect-video bg-gray-900 relative">
                <video src={video.videoUrl} className="w-full h-full object-cover" controls preload="metadata" />
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
    </div>
  );
};

export default Videos;
