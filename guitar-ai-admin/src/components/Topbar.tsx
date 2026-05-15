import { MdLogout } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '../store';
import { logoutUser } from '../store/slices/authSlice';

const Topbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex-1"></div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-gray-800">{user?.name}</span>
            <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
          </div>
          {user?.coverImage ? (
            <img src={user.coverImage} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Logout"
        >
          <MdLogout className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
