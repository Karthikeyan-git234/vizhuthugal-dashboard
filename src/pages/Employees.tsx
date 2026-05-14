import { useEffect, useState } from 'react';

import {
  Search,
  Plus,
  Trash2,
  User,
  Briefcase,
  X,
  Pencil,
} from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  role: string;
  status: string;
}

export default function Employees() {

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [search, setSearch] = useState('');

  const [status, setStatus] = useState('All Status');

  // Add/Edit Modal
  const [open, setOpen] = useState(false);

  // Delete Modal
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Edit
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Form
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [employeeStatus, setEmployeeStatus] = useState('Active');

  // Initial Data
  useEffect(() => {

    setEmployees([
      {
        id: 1,
        name: 'Karthikeyan',
        role: 'Frontend Developer',
        status: 'Active',
      },

      {
        id: 2,
        name: 'Arun Kumar',
        role: 'UI Designer',
        status: 'Inactive',
      },

      {
        id: 3,
        name: 'Vignesh',
        role: 'Backend Developer',
        status: 'Pending',
      },
    ]);

  }, []);

  // Add / Update Employee
  const handleAddEmployee = () => {

    if (!name.trim() || !role.trim()) {
      return;
    }

    // Update
    if (isEdit && editId !== null) {

      const updatedEmployees = employees.map((emp) =>

        emp.id === editId
          ? {
              ...emp,
              name,
              role,
              status: employeeStatus,
            }
          : emp
      );

      setEmployees(updatedEmployees);

    } else {

      // Add
      const newEmployee = {
        id: Date.now(),
        name,
        role,
        status: employeeStatus,
      };

      setEmployees([newEmployee, ...employees]);
    }

    // Reset
    setName('');
    setRole('');
    setEmployeeStatus('Active');

    setEditId(null);
    setIsEdit(false);

    setOpen(false);
  };

  // Delete
  const handleDelete = (id: number) => {

    const updatedEmployees = employees.filter(
      (emp) => emp.id !== id
    );

    setEmployees(updatedEmployees);

    setDeleteOpen(false);
    setDeleteId(null);
  };

  // Edit
  const handleEdit = (emp: Employee) => {

    setName(emp.name);

    setRole(emp.role);

    setEmployeeStatus(emp.status);

    setEditId(emp.id);

    setIsEdit(true);

    setOpen(true);
  };

  // Confirm Delete
  const confirmDelete = (id: number) => {

    setDeleteId(id);
    setDeleteOpen(true);
  };

  // Search + Filter
  const filteredEmployees = employees.filter((emp) => {

    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === 'All Status'
        ? true
        : emp.status === status;

    return matchesSearch && matchesStatus;
  });

  return (

    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Employees Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all employee details professionally
          </p>

        </div>

        {/* Add Button */}
        <button
          onClick={() => {

            setOpen(true);

            setIsEdit(false);

            setName('');
            setRole('');
            setEmployeeStatus('Active');

          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-sm transition-all duration-300"
        >

          <Plus size={20} />

          Add Employee

        </button>

      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 mb-8">

        <div className="flex flex-col md:flex-row md:items-center gap-4">

          {/* Search */}
          <div className="flex items-center gap-3 flex-1 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200">

            <Search
              className="text-slate-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            />

          </div>

          {/* Status Filter */}
          <div className="min-w-[220px]">

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-700 focus:border-blue-500 transition"
            >

              <option>
                All Status
              </option>

              <option>
                Active
              </option>

              <option>
                Inactive
              </option>

              <option>
                Pending
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <p className="text-slate-500 text-sm mb-2">
            Total Employees
          </p>

          <h2 className="text-4xl font-bold text-slate-800">
            {employees.length}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <p className="text-slate-500 text-sm mb-2">
            Active Employees
          </p>

          <h2 className="text-4xl font-bold text-green-600">

            {
              employees.filter(
                (emp) => emp.status === 'Active'
              ).length
            }

          </h2>

        </div>
              {/* Inactive Employees */}

<div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

  <p className="text-slate-500 text-sm mb-2">
    Inactive Employees
  </p>

  <h2 className="text-4xl font-bold text-red-600">

    {
      employees.filter(
        (emp) => emp.status === 'Inactive'
      ).length
    }

  </h2>

</div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <p className="text-slate-500 text-sm mb-2">
            Pending Employees
          </p>

          <h2 className="text-4xl font-bold text-orange-500">

            {
              employees.filter(
                (emp) => emp.status === 'Pending'
              ).length
            }

          </h2>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-4 bg-slate-100 px-6 py-4 border-b border-slate-200">

          <h2 className="font-semibold text-slate-700">
            Employee
          </h2>

          <h2 className="font-semibold text-slate-700">
            Role
          </h2>

          <h2 className="font-semibold text-slate-700">
            Status
          </h2>

          <h2 className="font-semibold text-slate-700 text-center">
            Actions
          </h2>

        </div>

        {/* Table Body */}
        <div>

          {filteredEmployees.map((emp) => (

            <div
              key={emp.id}
              className="grid grid-cols-4 items-center px-6 py-5 border-b border-slate-100 hover:bg-slate-50 transition-all duration-300"
            >

              {/* Employee */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <User
                    className="text-blue-600"
                    size={22}
                  />

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
              <div className="flex items-center gap-2 text-slate-600">

                <Briefcase size={16} />

                <span>
                  {emp.role}
                </span>

              </div>

              {/* Status */}
              <div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${
                      emp.status === 'Active'
                        ? 'bg-green-100 text-green-600'
                        : emp.status === 'Inactive'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-orange-100 text-orange-600'
                    }
                  `}
                >

                  {emp.status}

                </span>

              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">

                {/* Edit */}
                <button
                  onClick={() => handleEdit(emp)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                >

                  <Pencil size={16} />

                  Edit

                </button>

                {/* Delete */}
                <button
                  onClick={() => confirmDelete(emp.id)}
                  className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 transition"
                >

                  <Trash2 size={18} />

                </button>

              </div>

            </div>

          ))}

          {/* Empty */}
          {filteredEmployees.length === 0 && (

            <div className="p-12 text-center">

              <h2 className="text-2xl font-bold text-slate-700 mb-2">
                No Employees Found
              </h2>

              <p className="text-slate-500">
                Add employees to display here
              </p>

            </div>

          )}

        </div>

      </div>

      {/* Add/Edit Modal */}
      {open && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-slate-800">

                  {isEdit
                    ? 'Edit Employee'
                    : 'Add Employee'
                  }

                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Enter employee details
                </p>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 p-2 rounded-xl transition"
              >

                <X size={20} />

              </button>

            </div>

            {/* Form */}
            <div className="space-y-5">

              {/* Name */}
              <div>

                <label className="block text-sm font-medium text-slate-600 mb-2">

                  Employee Name

                </label>

                <input
                  type="text"
                  placeholder="Enter employee name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

              {/* Role */}
              <div>

                <label className="block text-sm font-medium text-slate-600 mb-2">

                  Employee Role

                </label>

                <input
                  type="text"
                  placeholder="Enter employee role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

              {/* Status */}
              <div>

                <label className="block text-sm font-medium text-slate-600 mb-2">

                  Employee Status

                </label>

                <select
                  value={employeeStatus}
                  onChange={(e) =>
                    setEmployeeStatus(e.target.value)
                  }
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                >

                  <option>
                    Active
                  </option>

                  <option>
                    Inactive
                  </option>

                  <option>
                    Pending
                  </option>

                </select>

              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">

                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-2xl font-medium"
                >

                  Cancel

                </button>

                <button
                  onClick={handleAddEmployee}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-medium"
                >

                  {isEdit
                    ? 'Update Employee'
                    : 'Add Employee'
                  }

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* Delete Modal */}
      {deleteOpen && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">

            <div className="mb-6">

              <h2 className="text-2xl font-bold text-slate-800">
                Delete Employee
              </h2>

              <p className="text-slate-500 mt-2">
                Are you sure you want to delete this employee?
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => {

                  setDeleteOpen(false);
                  setDeleteId(null);

                }}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-2xl font-medium"
              >

                Cancel

              </button>

              <button
                onClick={() => {
                  if (deleteId !== null) {
                    handleDelete(deleteId);
                  }
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-medium"
              >

                Delete

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}