import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Reports from './pages/Reports'

export default function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={
          <Navigate to="/login" />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/employees"
        element={<Employees />}
      />

      <Route
        path="/reports"
        element={<Reports />}
      />

    </Routes>
  )
}