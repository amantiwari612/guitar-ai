import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { MdPeople, MdVideoLibrary } from 'react-icons/md';

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, videos: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, videosRes] = await Promise.all([
          api.get('/auth/users'),
          api.get('/videos')
        ]);
        
        setStats({
          users: usersRes.data.data.length || 0,
          videos: videosRes.data.data.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of the Guitar AI platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <MdPeople className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">
              {isLoading ? '...' : stats.users}
            </p>
          </div>
        </div>

        {/* Videos Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <MdVideoLibrary className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Videos</p>
            <p className="text-2xl font-bold text-gray-900">
              {isLoading ? '...' : stats.videos}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
