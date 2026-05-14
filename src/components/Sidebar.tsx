import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
   
} from 'lucide-react';
import { ClipboardCheck } from 'lucide-react';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

export default function Sidebar() {

  const location = useLocation();

  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {

    // Optional
    // localStorage.removeItem('token');

    navigate('/Login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/Dashboard',
    },

    {
      title: 'Employees',
      icon: <Users size={20} />,
      path: '/Employees',
    },

     {
  title: 'Attendance',
  icon: <ClipboardCheck size={20} />,
  path: '/Attendance',
},

    {
      title: 'Reports',
      icon: <FileText size={20} />,
      path: '/Reports',
    },

    {
      title: 'Settings',
      icon: <Settings size={20} />,
      path: '/Settings',
    },
  ];

  return (

    <div className="w-72 h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white shadow-2xl flex flex-col justify-between fixed left-0 top-0 z-50">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="p-6 border-b border-blue-500/40">

          <div className="flex items-center gap-4">

            {/* Logo Image */}
            <img
              src="/vizhuthugal.png"
              alt="Vizhuthugal Logo"
              className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white"
            />

            {/* Title */}
            <div>

              <h1 className="text-3xl font-bold tracking-wide"> 
                Vizhuthugal
              </h1>

              <p className="text-blue-200 text-sm mt-1">
                Alumni Connect
              </p>

            </div>

          </div>

        </div>

        {/* Menu */}
        <div className="p-5">

          <p className="text-blue-200 text-xs uppercase mb-4 tracking-[3px] font-semibold">

            Admin Panel

          </p>

          <ul className="space-y-3">

            {menuItems.map((item, index) => {

              const active = location.pathname === item.path;

              return (

                <Link
                  key={index}
                  to={item.path}
                >

                  <li
                    className={`
                      flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer font-medium text-lg
                      
                      ${
                        active
                          ? 'bg-white text-blue-700 shadow-xl scale-[1.02]'
                          : 'hover:bg-white/15 hover:text-white'
                      }
                    `}
                  >

                    <div>

                      {item.icon}

                    </div>

                    <span>
                      {item.title}
                    </span>

                  </li>

                </Link>

              );
            })}

          </ul>

        </div>

      </div>

      {/* Logout */}
      <div className="p-5 border-t border-blue-500/40">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-white text-blue-700 py-3 rounded-2xl font-semibold hover:bg-blue-100 transition-all duration-300 shadow-lg"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </div>
  );
}