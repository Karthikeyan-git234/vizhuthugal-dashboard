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

export default function Dashboard() {

  const stats = [
    {
      title: 'Total Employees',
      value: '124',
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

      {/* Charts + Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-800">
              Employee Status
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Employee distribution overview
            </p>

          </div>

          <div className="w-full h-[320px]">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={employeeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >

                  {employeeData.map((_, index) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Quick Overview */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Quick Overview
          </h2>

          <div className="space-y-6">

            <div>

              <div className="flex justify-between mb-2">

                <p className="text-sm font-medium text-slate-600">
                  Attendance
                </p>

                <p className="text-sm font-bold text-slate-800">
                  80%
                </p>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">

                <div className="bg-blue-600 h-3 rounded-full w-[80%]"></div>

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <p className="text-sm font-medium text-slate-600">
                  Reports Submitted
                </p>

                <p className="text-sm font-bold text-slate-800">
                  65%
                </p>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">

                <div className="bg-purple-600 h-3 rounded-full w-[65%]"></div>

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <p className="text-sm font-medium text-slate-600">
                  Task Completion
                </p>

                <p className="text-sm font-bold text-slate-800">
                  92%
                </p>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">

                <div className="bg-green-600 h-3 rounded-full w-[92%]"></div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
            Recent Activities
          </h2>

          <button className="text-blue-600 text-sm font-medium hover:underline">

            View All

          </button>

        </div>

        <div className="space-y-5">

          {activities.map((item, index) => (

            <div
              key={index}
              className="flex items-start justify-between border-b border-slate-100 pb-5 last:border-none"
            >

              <div className="flex gap-4">

                <div className="bg-blue-100 p-3 rounded-2xl h-fit">

                  <Activity
                    className="text-blue-600"
                    size={20}
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {item.desc}
                  </p>

                </div>

              </div>

              <span className="text-xs text-slate-400 whitespace-nowrap">
                {item.time}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}