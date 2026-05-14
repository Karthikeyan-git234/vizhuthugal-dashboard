import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';

import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Attendance from './pages/Attendance';
import Notifications from './pages/Notification';

export default function App() {

  return (

    <Routes>

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Redirect */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      {/* Dashboard Layout */}
      <Route element={<DashboardLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/employees"
          element={<Employees />}
        />
        <Route
          path="/attendance"
          element={<Attendance />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
         />
        

      </Route>
      

    </Routes>
  );
}