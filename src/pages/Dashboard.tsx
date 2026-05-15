import {
  Users,
  UserCheck,
  FileText,
  Clock3,
  TrendingUp,
  Activity,
} from 'lucide-react';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

export default function Dashboard() {

  const [employees, setEmployees] =
    useState<any[]>([]);

  // Fetch Employees
  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees = async () => {

    try {

      const res =
        await axios.get(
          'http://localhost:5000/api/employees'
        );

      setEmployees(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // Stats
  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: <Users size={28} />,
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },

    {
      title: 'Present Today',
      value: '98',
      icon: <UserCheck size={28} />,
      bg: 'bg-green-100',
      text: 'text-green-600',
    },

    {
      title: 'Reports Submitted',
      value: '42',
      icon: <FileText size={28} />,
      bg: 'bg-purple-100',
      text: 'text-purple-600',
    },

    {
      title: 'Pending Tasks',
      value: '12',
      icon: <Clock3 size={28} />,
      bg: 'bg-orange-100',
      text: 'text-orange-600',
    },
  ];

  // Pie Chart Data
  const employeeData = [
    {
      name: 'Active',
      value: 98,
    },

    {
      name: 'Inactive',
      value: 12,
    },

    {
      name: 'Pending',
      value: 14,
    },
  ];

  const COLORS = [
    '#22c55e',
    '#ef4444',
    '#f59e0b',
  ];

  const activities = [
    {
      title: 'New Employee Added',
      desc: 'Karthikeyan joined as Frontend Developer',
      time: '2 mins ago',
    },

    {
      title: 'Attendance Updated',
      desc: 'Arun Kumar checked in successfully',
      time: '10 mins ago',
    },

    {
      title: 'Daily Report Submitted',
      desc: 'UI Team uploaded today’s work report',
      time: '1 hour ago',
    },

    {
      title: 'Task Completed',
      desc: 'Backend API integration finished',
      time: '2 hours ago',
    },
  ];

  return (

    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Welcome back, State Admin 👋
          </p>

        </div>

        {/* Performance */}
        <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl shadow-sm border border-slate-200">

          <div className="bg-green-100 p-3 rounded-xl">

            <TrendingUp
              className="text-green-600"
              size={24}
            />

          </div>

          <div>

            <h2 className="font-bold text-slate-800">
              +18%
            </h2>

            <p className="text-sm text-slate-500">
              Usage Increased
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm mb-2">
                  {item.title}
                </p>

                <h2 className="text-4xl font-bold text-slate-800">
                  {item.value}
                </h2>

              </div>

              <div
                className={`${item.bg} ${item.text} p-4 rounded-2xl`}
              >

                {item.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Employee List */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-slate-800">

            Employees

          </h2>

          <button
            onClick={fetchEmployees}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition"
          >

            Refresh

          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200 text-left">

                <th className="py-3 text-slate-600">
                  Name
                </th>

                <th className="py-3 text-slate-600">
                  Email
                </th>

                <th className="py-3 text-slate-600">
                  Phone
                </th>

                <th className="py-3 text-slate-600">
                  Department
                </th>

              </tr>

            </thead>

            <tbody>

              {employees.map((employee) => (

                <tr
                  key={employee.id}
                  className="border-b border-slate-100"
                >

                  <td className="py-4 font-medium text-slate-800">
                    {employee.name}
                  </td>

                  <td className="py-4 text-slate-600">
                    {employee.email}
                  </td>

                  <td className="py-4 text-slate-600">
                    {employee.phone}
                  </td>

                  <td className="py-4 text-slate-600">
                    {employee.department}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}