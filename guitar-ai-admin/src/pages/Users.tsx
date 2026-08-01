import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../store';
import {
  getAllUsers,
  addUser,
  deleteUser,
  toggleUserRestriction,
} from '../store/slices/userSlice';

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useSelector((state: RootState) => state.users);

  // Modal & Form State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleToggleRestrict = (userId: string, currentRestrictedState: boolean) => {
    dispatch(
      toggleUserRestriction({
        userId,
        isRestricted: !currentRestrictedState,
      })
    );
  };

  const handleDelete = (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      dispatch(deleteUser(userId));
    }
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addUser(formData)).then((res) => {
      if (!res.type.endsWith('/rejected')) {
        setIsAddModalOpen(false);
        setFormData({ name: '', email: '', password: '', role: 'user' });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Add User Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage all registered users.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow-sm transition"
        >
          + Add User
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {/* Restrict / Unrestrict Button */}
                      <button
                        onClick={() => handleToggleRestrict(user._id, user.isRestricted)}
                        className={`px-3 py-1 rounded text-xs font-semibold ${user.isRestricted
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                          }`}
                      >
                        {user.isRestricted ? 'Unrestrict' : 'Restrict'}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(user._id, user.name)}
                        className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded text-xs font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding New User */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;