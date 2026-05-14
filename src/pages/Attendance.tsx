import { useState } from 'react';

import {
  Search,
  CalendarDays,
  UserCheck,
  UserX,
  Clock3,
} from 'lucide-react';

interface Attendance {
  id: number;
  name: string;
  role: string;
  date: string;
  status: string;
}

export default function Attendance() {

  const [search, setSearch] = useState('');

  const [status, setStatus] = useState('All Status');

  const attendanceData: Attendance[] = [
    {
      id: 1,
      name: 'Karthikeyan',
      role: 'Frontend Developer',
      date: '14 May 2026',
      status: 'Present',
    },

    {
      id: 2,
      name: 'Arun Kumar',
      role: 'UI Designer',
      date: '14 May 2026',
      status: 'Absent',
    },

    {
      id: 3,
      name: 'Vignesh',
      role: 'Backend Developer',
      date: '14 May 2026',
      status: 'Late',
    },

    {
      id: 4,
      name: 'Ramesh',
      role: 'HR Manager',
      date: '14 May 2026',
      status: 'Present',
    },
  ];

  // Filter
  const filteredAttendance = attendanceData.filter((emp) => {

    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === 'All Status'
        ? true
        : emp.status === status;

    return matchesSearch && matchesStatus;
  });

  return (

    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Attendance Management
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor employee attendance records
          </p>

        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-sm transition">

          <CalendarDays size={20} />

          Mark Attendance

        </button>

      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200">

        <div className="flex flex-col md:flex-row md:items-center gap-4">

          {/* Search */}
          <div className="flex items-center gap-3 flex-1 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200">

            <Search
              className="text-slate-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-slate-700"
            />

          </div>

          {/* Filter */}
          <div className="min-w-[220px]">

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-700"
            >

              <option>
                All Status
              </option>

              <option>
                Present
              </option>

              <option>
                Absent
              </option>

              <option>
                Late
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Total */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <p className="text-slate-500 text-sm mb-2">
            Total Employees
          </p>

          <h2 className="text-4xl font-bold text-slate-800">
            {attendanceData.length}
          </h2>

        </div>

        {/* Present */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <p className="text-slate-500 text-sm mb-2">
            Present
          </p>

          <h2 className="text-4xl font-bold text-green-600">

            {
              attendanceData.filter(
                (emp) => emp.status === 'Present'
              ).length
            }

          </h2>

        </div>

        {/* Absent */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <p className="text-slate-500 text-sm mb-2">
            Absent
          </p>

          <h2 className="text-4xl font-bold text-red-600">

            {
              attendanceData.filter(
                (emp) => emp.status === 'Absent'
              ).length
            }

          </h2>

        </div>

        {/* Late */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <p className="text-slate-500 text-sm mb-2">
            Late
          </p>

          <h2 className="text-4xl font-bold text-orange-500">

            {
              attendanceData.filter(
                (emp) => emp.status === 'Late'
              ).length
            }

          </h2>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-4 bg-slate-100 px-6 py-4 border-b border-slate-200">

          <h2 className="font-semibold text-slate-700">
            Employee
          </h2>

          <h2 className="font-semibold text-slate-700">
            Role
          </h2>

          <h2 className="font-semibold text-slate-700">
            Date
          </h2>

          <h2 className="font-semibold text-slate-700">
            Status
          </h2>

        </div>

        {/* Body */}
        <div>

          {filteredAttendance.map((emp) => (

            <div
              key={emp.id}
              className="grid grid-cols-4 items-center px-6 py-5 border-b border-slate-100 hover:bg-slate-50 transition"
            >

              {/* Employee */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                  {
                    emp.status === 'Present'
                      ? (
                        <UserCheck
                          className="text-green-600"
                          size={22}
                        />
                      )
                      : (
                        <UserX
                          className="text-red-600"
                          size={22}
                        />
                      )
                  }

                </div>

                <div>

                  <h2 className="font-semibold text-slate-800">
                    {emp.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Employee ID #{emp.id}
                  </p>

                </div>

              </div>

              {/* Role */}
              <div className="text-slate-600">
                {emp.role}
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-slate-600">

                <CalendarDays size={16} />

                {emp.date}

              </div>

              {/* Status */}
              <div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${
                      emp.status === 'Present'
                        ? 'bg-green-100 text-green-600'
                        : emp.status === 'Absent'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-orange-100 text-orange-600'
                    }
                  `}
                >

                  {emp.status}

                </span>

              </div>

            </div>

          ))}

          {/* Empty */}
          {filteredAttendance.length === 0 && (

            <div className="p-12 text-center">

              <Clock3
                className="mx-auto text-slate-400 mb-4"
                size={40}
              />

              <h2 className="text-2xl font-bold text-slate-700 mb-2">
                No Attendance Found
              </h2>

              <p className="text-slate-500">
                Try another search or filter
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}