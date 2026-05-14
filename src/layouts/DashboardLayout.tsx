import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {

  return (

    <div className="bg-slate-100 min-h-screen">

      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-72 z-50">

        <Sidebar />

      </div>

      {/* Main Content */}
      <div className="ml-72 min-h-screen flex flex-col">

        {/* Fixed Navbar */}
        <div className="sticky top-0 z-40">

          <Navbar />

        </div>

        {/* Scrollable Content */}
        <main className="p-6 flex-1 overflow-y-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
}