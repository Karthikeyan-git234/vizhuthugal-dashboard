import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {

  return (

    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-4">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow">
              Total Employees
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              Active Users
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              Reports
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}