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
import Register from './pages/Register';
import ForgotPassword from './pages/Forgotpassword';

import ProfileSettings from './pages/profile-settings';
import NotificationSettings from './pages/NotificationSettings';
import SecuritySettings from './pages/SecuritySettings';
import MentorshipTeam from './pages/mentorshipteam';
import CommunityTeam from './pages/communityteam';

export default function App() {

  return (

    <Routes>

      {/* Login */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Register */}

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Forgot Password */}

      <Route
        path="/forgotpassword"
        element={<ForgotPassword />}
      />

      {/* Default Redirect */}

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      {/* Dashboard Layout */}

      <Route element={<DashboardLayout />}>

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Employees */}

        <Route
          path="/employees"
          element={<Employees />}
        />

        {/* Attendance */}

        <Route
          path="/attendance"
          element={<Attendance />}
        />

        {/* Community Team Now  */}

        <Route
          path="/reports"
          element={<Reports />}
        />

        {/* Mentorship Team  */}

            <Route
          path="/mentorshipteam"
          element={<MentorshipTeam />}
        />

        {/* Community Team  */}

            <Route
          path="/communityteam"
          element={<CommunityTeam />}
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* Profile Settings */}

        <Route
          path="/profile-settings"
          element={<ProfileSettings />}
        />

        {/* Notifications */}

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* Notification Settings */}

        <Route
          path="/notificationsettings"
          element={<NotificationSettings />}
        />

        {/* Security Settings */}

        <Route
          path="/securitysettings"
          element={<SecuritySettings />}
        />

      </Route>

    </Routes>
  );
}