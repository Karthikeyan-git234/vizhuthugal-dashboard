import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Search,
  Plus,
  Users,
  Briefcase,
  Building2,
  Mail,
  X,
  Pencil,
  Trash2,
} from 'lucide-react'

import api from '../services/api'

export default function Employees() {

  const [employees, setEmployees] =
    useState<any[]>([])

  const [search, setSearch] =
    useState('')

  const [filterRole, setFilterRole] =
    useState('All')

  const [showModal, setShowModal] =
    useState(false)

  const [editId, setEditId] =
    useState<number | null>(null)

  /* Form States */

  const [name, setName] =
    useState('')

  const [role, setRole] =
    useState('')

  const [phone, setPhone] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [department, setDepartment] =
    useState('')

  const [joiningDate, setJoiningDate] =
    useState('')

  /* Fetch Employees */

  const fetchEmployees =
    async () => {

      try {

        const res =
          await api.get(
            '/employees'
          )

        setEmployees(res.data)

      } catch (err) {

        console.log(err)

      }
    }

  useEffect(() => {

    fetchEmployees()

  }, [])

  /* Edit */

  const handleEdit = (
    item: any
  ) => {

    setEditId(item.id)

    setName(item.name)

    setRole(item.role)

    setPhone(item.phone)

    setEmail(item.email)

    setDepartment(
      item.department
    )

    setJoiningDate(
      item.joining_date
    )

    setShowModal(true)
  }

  /* Delete */

  const handleDelete =
    async (id: number) => {

      const confirmDelete =
        window.confirm(
          'Are you sure you want to delete this employee?'
        )

      if (!confirmDelete)
        return

      try {

        await api.delete(
          `/employees/${id}`
        )

        fetchEmployees()

      } catch (err) {

        console.log(err)

      }
    }

  /* Save Employee */

  const handleAddEmployee =
    async () => {

      if (
        !name ||
        !role ||
        !phone ||
        !email ||
        !department ||
        !joiningDate
      ) {

        alert(
          'Fill all details'
        )

        return
      }

      /* Phone Validation */

      const phoneRegex =
        /^[0-9]{10}$/

      if (
        !phoneRegex.test(phone)
      ) {

        alert(
          'Phone number must contain exactly 10 digits'
        )

        return
      }

      /* Email Validation */

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (
        !emailRegex.test(email)
      ) {

        alert(
          'Enter valid email'
        )

        return
      }

      try {

        if (editId) {

          await api.put(

            `/employees/${editId}`,

            {
              name,
              role,
              phone,
              email,
              department,
              joiningDate,
            }

          )

        } else {

          await api.post(
            '/employees',
            {
              name,
              role,
              phone,
              email,
              department,
              joiningDate,
            }
          )
        }

        fetchEmployees()

        setShowModal(false)

        setEditId(null)

        setName('')
        setRole('')
        setPhone('')
        setEmail('')
        setDepartment('')
        setJoiningDate('')

      } catch (err) {

        console.log(err)

      }
    }

  /* Filter */

  const filteredEmployees =
    useMemo(() => {

      return employees.filter(
        (item: any) => {

          const matchesSearch =

            item.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            item.email
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

          const matchesRole =

            filterRole === 'All'
              ? true
              : item.role ===
                filterRole

          return (
            matchesSearch &&
            matchesRole
          )
        }
      )

    }, [
      employees,
      search,
      filterRole,
    ])

  /* Stats */

  const totalEmployees =
    employees.length

  const technicalCount =
    employees.filter(
      (item) =>
        item.role ===
        'Technical'
    ).length

  const mentoringCount =
    employees.filter(
      (item) =>
        item.role ===
        'Mentoring'
    ).length

  const communityCount =
    employees.filter(
      (item) =>
        item.role ===
        'Community'
    ).length

  return (

    <div className="p-6 bg-slate-100 min-h-screen">
       
      {/* Header */}
      

      <div className="flex items-center justify-between mb-8">

    
        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            Employees

          </h1>

          <p className="text-slate-500 mt-1">

            Manage all employee details

          </p>

        </div>

        {/* Add Button */}

        <button
          onClick={() => {

            setEditId(null)

            setName('')
            setRole('')
            setPhone('')
            setEmail('')
            setDepartment('')
            setJoiningDate('')

            setShowModal(true)

          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-3 rounded-2xl shadow-lg"
        >

          <Plus size={18} />

          Add Employee

        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 text-sm">
                Total Employees
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {totalEmployees}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

              <Users
                size={26}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 text-sm">
                Technical
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {technicalCount}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

              <Briefcase
                size={26}
                className="text-violet-600"
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 text-sm">
                Mentoring
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {mentoringCount}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

              <Mail
                size={26}
                className="text-emerald-600"
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 text-sm">
                Community
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {communityCount}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

              <Building2
                size={26}
                className="text-orange-600"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Search + Filter */}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 mb-8">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1 relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full h-14 rounded-2xl border border-slate-300 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />

          </div>

          <select
            value={filterRole}
            onChange={(e) =>
              setFilterRole(
                e.target.value
              )
            }
            className="h-14 px-5 rounded-2xl border border-slate-300 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
          >

            <option value="All">
              All Roles
            </option>

            <option value="Technical">
              Technical
            </option>

            <option value="Mentoring">
              Mentoring
            </option>

            <option value="Community">
              Community
            </option>

          </select>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-slate-200">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-5 text-left">
                Name
              </th>

              <th className="p-5 text-left">
                Role
              </th>

              <th className="p-5 text-left">
                Phone
              </th>

              <th className="p-5 text-left">
                Email
              </th>

              <th className="p-5 text-left">
                Department
              </th>

              <th className="p-5 text-left">
                Joining Date
              </th>

              <th className="p-5 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {
              filteredEmployees.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="text-center py-16"
                  >

                    <div className="flex flex-col items-center">

                      <Users
                        size={55}
                        className="text-slate-300"
                      />

                      <h2 className="text-2xl font-bold text-slate-700 mt-4">

                        No Employees Found

                      </h2>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredEmployees.map(
                  (item: any) => (

                    <tr
                      key={item.id}
                      className="border-b hover:bg-slate-50 transition-all"
                    >

                      <td className="p-5 font-semibold text-slate-800">
                        {item.name}
                      </td>

                      <td className="p-5">
                        <span className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 text-sm font-medium">
                          {item.role}
                        </span>
                      </td>

                      <td className="p-5 text-slate-700">
                        {item.phone}
                      </td>

                      <td className="p-5 text-slate-700">
                        {item.email}
                      </td>

                      <td className="p-5 text-slate-700">
                        {item.department}
                      </td>

                      <td className="p-5 text-slate-700">
                        {item.joining_date}
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
                )
              )
            }

          </tbody>

        </table>

      </div>

      {/* Modal */}

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

                {
                  editId
                    ? 'Edit Employee'
                    : 'Add Employee'
                }

              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">

                    Employee Name

                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-slate-300 px-4 outline-none focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">

                    Phone Number

                  </label>

                  <input
                    type="text"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-slate-300 px-4 outline-none focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">

                    Email Address

                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-slate-300 px-4 outline-none focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">

                    Department

                  </label>

                  <input
                    type="text"
                    value={department}
                    onChange={(e) =>
                      setDepartment(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-slate-300 px-4 outline-none focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">

                    Role

                  </label>

                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-slate-300 px-4 outline-none focus:ring-4 focus:ring-blue-100"
                  >

                    <option value="">
                      Select Role
                    </option>

                    <option value="Technical">
                      Technical
                    </option>

                    <option value="Mentoring">
                      Mentoring
                    </option>

                    <option value="Community">
                      Community
                    </option>

                  </select>

                </div>

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">

                    Joining Date

                  </label>

                  <input
                    type="date"
                    value={joiningDate}
                    onChange={(e) =>
                      setJoiningDate(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-slate-300 px-4 outline-none focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Submit */}

              <button
                onClick={
                  handleAddEmployee
                }
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 transition-all rounded-2xl text-white font-semibold mt-8"
              >

                {
                  editId
                    ? 'Update Employee'
                    : 'Save Employee'
                }

              </button>

            </div>

          </div>
        )
      }

    </div>
  )
}