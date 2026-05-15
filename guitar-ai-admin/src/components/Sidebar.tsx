import { NavLink } from 'react-router-dom';
import { MdDashboard, MdPeople, MdVideoLibrary } from 'react-icons/md';

const Sidebar = () => {
  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <MdDashboard className="w-5 h-5" /> },
    { name: 'Users', path: '/users', icon: <MdPeople className="w-5 h-5" /> },
    { name: 'Videos', path: '/videos', icon: <MdVideoLibrary className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-wider text-primary-400">
          GUITAR AI
        </h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Admin Portal</p>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {link.icon}
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
