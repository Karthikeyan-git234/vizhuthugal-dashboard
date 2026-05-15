import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  CalendarDays,
  Clock3,
  Search,
  Users,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'

import api from '../services/api'

export default function Attendance() {

  const [attendance, setAttendance] =
    useState<any[]>([])

  const [search, setSearch] =
    useState('')

  const [selectedDate, setSelectedDate] =
    useState('')

  const [showModal, setShowModal] =
    useState(false)

  const [editId, setEditId] =
    useState<number | null>(null)

  const [employeeName, setEmployeeName] =
    useState('')

  const [checkInTime, setCheckInTime] =
    useState('')

  const [checkOutTime, setCheckOutTime] =
    useState('')

  const [workDone, setWorkDone] =
    useState('')

  /* Fetch Attendance */

  const fetchAttendance =
    async () => {

      try {

        const res =
          await api.get('/work')

        setAttendance(res.data)

      } catch (err) {

        console.log(err)

      }
    }

  useEffect(() => {

    fetchAttendance()

  }, [])

  /* Edit */

  const handleEdit = (
    item: any
  ) => {

    setEditId(item.id)

    setEmployeeName(
      item.employee_name
    )

    setCheckInTime(
      item.check_in
    )

    setCheckOutTime(
      item.check_out
    )

    setWorkDone(
      item.work_done
    )

    setShowModal(true)
  }

  /* Delete */

  const handleDelete =
    async (id: number) => {

      const confirmDelete =
        window.confirm(
          'Delete attendance report?'
        )

      if (!confirmDelete)
        return

      try {

        await api.delete(
          `/work/${id}`
        )

        fetchAttendance()

      } catch (err) {

        console.log(err)

      }
    }

  /* Update */

  const handleUpdate =
    async () => {

      try {

        await api.put(

          `/work/${editId}`,

          {
            employeeName,
            checkIn:
              checkInTime,
            checkOut:
              checkOutTime,
            workDone,
          }

        )

        fetchAttendance()

        setShowModal(false)

        setEditId(null)

      } catch (err) {

        console.log(err)

      }
    }

  /* Filter */

  const filteredAttendance =
    useMemo(() => {

      return attendance.filter(
        (item: any) => {

          const matchesSearch =

            item.employee_name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

          const matchesDate =

            selectedDate === ''
              ? true
              : item.check_in
                  ?.split('T')[0] ===
                selectedDate

          return (
            matchesSearch &&
            matchesDate
          )
        }
      )

    }, [
      attendance,
      search,
      selectedDate,
    ])

  /* Stats */

  const totalAttendance =
    attendance.length

  const todayDate =
    new Date()
      .toISOString()
      .split('T')[0]

  const todayPresent =
    attendance.filter(
      (item) =>
        item.check_in
          ?.split('T')[0] ===
        todayDate
    ).length

  const totalHours =
    attendance.reduce(
      (
        total,
        item
      ) => {

        const checkIn =
          new Date(
            item.check_in
          )

        const checkOut =
          new Date(
            item.check_out
          )

        const diff =
          (
            checkOut.getTime() -
            checkIn.getTime()
          ) /
          (1000 * 60 * 60)

        return (
          total + diff
        )

      },
      0
    )

  return (

    <div className="p-6 bg-slate-100 min-h-screen">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">

          Attendance Dashboard

        </h1>

        <p className="text-slate-500 mt-1">

          Employee daily attendance reports

        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* Total */}

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 text-sm">

                Total Reports

              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">

                {totalAttendance}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

              <Users
                size={28}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>

        {/* Today */}

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 text-sm">

                Today Present

              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">

                {todayPresent}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

              <CalendarDays
                size={28}
                className="text-emerald-600"
              />

            </div>

          </div>

        </div>

        {/* Hours */}

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 text-sm">

                Total Working Hours

              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">

                {totalHours.toFixed(1)}h

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

              <Clock3
                size={28}
                className="text-orange-600"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Search + Filter */}

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 mb-8">

        <div className="flex flex-col md:flex-row gap-4">

          {/* Search */}

          <div className="flex-1 relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full h-14 rounded-2xl border border-slate-300 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />

          </div>

          {/* Date Filter */}

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(
                e.target.value
              )
            }
            className="h-14 px-5 rounded-2xl border border-slate-300 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
          />

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-slate-200">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-5 text-left">
                Employee
              </th>

              <th className="p-5 text-left">
                Check In
              </th>

              <th className="p-5 text-left">
                Check Out
              </th>

              <th className="p-5 text-left">
                Work Done
              </th>

              <th className="p-5 text-left">
                Hours
              </th>

              <th className="p-5 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {
              filteredAttendance.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-16"
                  >

                    <div className="flex flex-col items-center">

                      <Users
                        size={55}
                        className="text-slate-300"
                      />

                      <h2 className="text-2xl font-bold text-slate-700 mt-4">

                        No Attendance Found

                      </h2>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredAttendance.map(
                  (item: any) => {

                    const checkIn =
                      new Date(
                        item.check_in
                      )

                    const checkOut =
                      new Date(
                        item.check_out
                      )

                    const hours =
                      (
                        (
                          checkOut.getTime() -
                          checkIn.getTime()
                        ) /
                        (1000 *
                          60 *
                          60)
                      ).toFixed(1)

                    return (

                      <tr
                        key={item.id}
                        className="border-b hover:bg-slate-50 transition-all"
                      >

                        <td className="p-5 font-semibold text-slate-800">

                          {item.employee_name}

                        </td>

                        <td className="p-5 text-slate-700">

                          {
                            checkIn.toLocaleTimeString(
                              [],
                              {
                                hour:
                                  '2-digit',
                                minute:
                                  '2-digit',
                              }
                            )
                          }

                        </td>

                        <td className="p-5 text-slate-700">

                          {
                            checkOut.toLocaleTimeString(
                              [],
                              {
                                hour:
                                  '2-digit',
                                minute:
                                  '2-digit',
                              }
                            )
                          }

                        </td>

                        <td className="p-5 text-slate-700 max-w-sm">

                          {item.work_done}

                        </td>

                        <td className="p-5">

                          <span className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 text-sm font-medium">

                            {hours} hrs

                          </span>

                        </td>

                        {/* Actions */}

                        <td className="p-5">

                          <div className="flex items-center gap-3">

                            {/* Edit */}

                            <button
                              onClick={() =>
                                handleEdit(item)
                              }
                              className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-all"
                            >

                              <Pencil
                                size={18}
                                className="text-blue-600"
                              />

                            </button>

                            {/* Delete */}

                            <button
                              onClick={() =>
                                handleDelete(item.id)
                              }
                              className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center hover:bg-red-200 transition-all"
                            >

                              <Trash2
                                size={18}
                                className="text-red-600"
                              />

                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  }
                )
              )
            }

          </tbody>

        </table>

      </div>

      {/* Edit Modal */}

      {
        showModal && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl relative">

              {/* Close */}

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="absolute top-5 right-5"
              >

                <X
                  size={24}
                  className="text-slate-500"
                />

              </button>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">

                Edit Attendance

              </h2>

              <div className="grid grid-cols-1 gap-5">

                {/* Employee */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">

                    Employee Name

                  </label>

                  <input
                    type="text"
                    value={employeeName}
                    onChange={(e) =>
                      setEmployeeName(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-slate-300 px-4 outline-none focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* Check In */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">

                    Check In

                  </label>

                  <input
                    type="datetime-local"
                    value={checkInTime?.slice(0,16)}
                    onChange={(e) =>
                      setCheckInTime(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-slate-300 px-4 outline-none focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* Check Out */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">

                    Check Out

                  </label>

                  <input
                    type="datetime-local"
                    value={checkOutTime?.slice(0,16)}
                    onChange={(e) =>
                      setCheckOutTime(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-slate-300 px-4 outline-none focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* Work Done */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">

                    Work Done

                  </label>

                  <textarea
                    value={workDone}
                    onChange={(e) =>
                      setWorkDone(
                        e.target.value
                      )
                    }
                    rows={5}
                    className="w-full rounded-2xl border border-slate-300 p-4 outline-none focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Update Button */}

              <button
                onClick={
                  handleUpdate
                }
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 transition-all rounded-2xl text-white font-semibold mt-8"
              >

                Update Attendance

              </button>

            </div>

          </div>
        )
      }

    </div>
  )
}