import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUploadCloud, FiVideo, FiImage } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { uploadVideo } from '../store/slices/videoSlice';
import type { AppDispatch } from '../store';

interface UploadVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadVideoModal: React.FC<UploadVideoModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !videoFile || !thumbnail) {
      setError('Please fill in all fields and select both files.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('videoFile', videoFile);
    formData.append('thumbnail', thumbnail);

    try {
      await dispatch(uploadVideo(formData)).unwrap();
      handleClose();
    } catch (err: unknown) {
      setError(typeof err === 'string' ? err : 'Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideoFile(null);
    setThumbnail(null);
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isUploading ? handleClose : undefined}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Upload New Lesson</h2>
                <button
                  onClick={handleClose}
                  disabled={isUploading}
                  className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isUploading}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter lesson title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isUploading}
                    rows={3}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Describe what students will learn..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Video Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video File
                    </label>
                    <div 
                      onClick={() => !isUploading && videoInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${videoFile ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'}`}
                    >
                      <FiVideo className={`w-6 h-6 mb-2 ${videoFile ? 'text-purple-600' : 'text-gray-400'}`} />
                      <span className="text-xs text-gray-500 break-all line-clamp-2">
                        {videoFile ? videoFile.name : 'Select Video'}
                      </span>
                    </div>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </div>

                  {/* Thumbnail Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thumbnail
                    </label>
                    <div 
                      onClick={() => !isUploading && thumbnailInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${thumbnail ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'}`}
                    >
                      <FiImage className={`w-6 h-6 mb-2 ${thumbnail ? 'text-purple-600' : 'text-gray-400'}`} />
                      <span className="text-xs text-gray-500 break-all line-clamp-2">
                        {thumbnail ? thumbnail.name : 'Select Image'}
                      </span>
                    </div>
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isUploading}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/20 transition-all disabled:opacity-70"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FiUploadCloud size={18} />
                        <span>Upload Video</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UploadVideoModal;
