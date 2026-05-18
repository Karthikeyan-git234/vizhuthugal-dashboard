import {
  Pencil,
  Trash2,
  Search,
  School,
  Building2,
  CheckCircle2,
  Filter,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import api from '../services/api'

import BackButton from '../components/BackButton'

export default function CommunityTeam() {

  const [search, setSearch] =
    useState('')

  const [statusFilter, setStatusFilter] =
    useState('All')

  const [teamData, setTeamData] =
    useState<any[]>([])

  // Fetch Data

  useEffect(() => {

    fetchSchools()

  }, [])

  const fetchSchools = async () => {

    try {

      const response =
        await api.get(
          '/schools'
        )

      setTeamData(
        response.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  // Search + Filter

  const filteredData =
    teamData.filter((item) => {

      const matchesSearch =

        item.school_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchesStatus =

        statusFilter === 'All'

          ? true

          : item.centenary_celebration_status ===
            statusFilter

      return (
        matchesSearch &&
        matchesStatus
      )
    })

  // Active Count

  const activeCount =
    teamData.filter(

      (item) =>

        item.centenary_celebration_status ===
        'Completed'

    ).length

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* Back Button */}

      <div className="mb-6">

        <BackButton />

      </div>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">

          Community Team Dashboard

        </h1>

        <p className="text-slate-500 mt-2 text-lg">

          Manage community school details and reports

        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Total */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex items-center justify-between">

          <div>

            <p className="text-slate-500 font-medium">

              Total Schools

            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-2">

              {teamData.length}

            </h2>

          </div>

          <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">

            <School size={30} />

          </div>

        </div>

        {/* Completed */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex items-center justify-between">

          <div>

            <p className="text-slate-500 font-medium">

              Celebration Completed

            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-2">

              {activeCount}

            </h2>

          </div>

          <div className="bg-green-100 p-4 rounded-2xl text-green-600">

            <CheckCircle2 size={30} />

          </div>

        </div>

        {/* District */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex items-center justify-between">

          <div>

            <p className="text-slate-500 font-medium">

              Districts

            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-2">

              {

                new Set(

                  teamData.map(
                    (item) =>
                      item.district
                  )

                ).size
              }

            </h2>

          </div>

          <div className="bg-orange-100 p-4 rounded-2xl text-orange-600">

            <Building2 size={30} />

          </div>

        </div>

      </div>

      {/* Search + Filter */}

      <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-5 mb-8">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}

          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 h-16 flex-1">

            <Search
              size={22}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search school..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-transparent flex-1 ml-4 outline-none text-lg"
            />

          </div>

          {/* Filter */}

          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 h-16 min-w-[260px]">

            <Filter
              size={22}
              className="text-slate-400"
            />

            <select

              value={statusFilter}

              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }

              className="bg-transparent flex-1 ml-4 outline-none text-lg text-slate-700"
            >

              <option value="All">

                All Status

              </option>

              <option value="Completed">

                Completed

              </option>

              <option value="Pending">

                Pending

              </option>

            </select>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-[32px] overflow-x-auto shadow-xl border border-slate-200">

        {/* Header */}

        <div className="min-w-[2200px] grid grid-cols-11 bg-blue-600 text-white px-6 py-5 font-semibold text-lg">

          <div>S.No</div>

          <div>District</div>

          <div>Block Name</div>

          <div>UDISE Code</div>

          <div>School Name</div>

          <div>School Category</div>

          <div>Management</div>

          <div>Status</div>

          <div>Celebration Date</div>

          <div>Committee</div>

          <div>Action</div>

        </div>

        {/* Body */}

        {

          filteredData.map(
            (item, index) => (

              <div
                key={item.id}

                className="
                  min-w-[2200px]
                  grid grid-cols-11
                  px-6 py-5
                  border-b border-slate-200
                  items-center
                  hover:bg-slate-50
                  transition
                "
              >

                {/* S.No */}

                <div className="font-semibold text-slate-700">

                  {
                    item.sno ||
                    index + 1
                  }

                </div>

                {/* District */}

                <div className="text-slate-700">

                  {item.district}

                </div>

                {/* Block */}

                <div className="text-slate-700">

                  {item.block_name}

                </div>

                {/* UDISE */}

                <div className="text-slate-700 font-medium">

                  {item.udise_code}

                </div>

                {/* School */}

                <div className="font-medium text-slate-800">

                  {item.school_name}

                </div>

                {/* Category */}

                <div className="text-slate-700">

                  {item.school_category}

                </div>

                {/* Management */}

                <div className="text-slate-700">

                  {item.management_category}

                </div>

                {/* Status */}

                <div>

                  <span
                    className={`
                      px-4 py-2 rounded-xl text-sm font-semibold
                      
                      ${
                        item.centenary_celebration_status ===
                        'Completed'

                          ? 'bg-green-100 text-green-700'

                          : 'bg-yellow-100 text-yellow-700'
                      }
                    `}
                  >

                    {
                      item.centenary_celebration_status
                    }

                  </span>

                </div>

                {/* Date */}

                <div className="text-slate-700">

                  {item.celebration_date}

                </div>

                {/* Committee */}

                <div>

                  <span
                    className={`
                      px-4 py-2 rounded-xl text-sm font-semibold
                      
                      ${
                        item.committee_formed_status ===
                        'Yes'

                          ? 'bg-blue-100 text-blue-700'

                          : 'bg-red-100 text-red-700'
                      }
                    `}
                  >

                    {
                      item.committee_formed_status
                    }

                  </span>

                </div>

                {/* Action */}

                <div className="flex items-center gap-4">

                  <button
                    className="
                      bg-blue-100
                      text-blue-600
                      p-3 rounded-xl
                      hover:bg-blue-200
                      transition
                    "
                  >

                    <Pencil size={18} />

                  </button>

                  <button
                    className="
                      bg-red-100
                      text-red-600
                      p-3 rounded-xl
                      hover:bg-red-200
                      transition
                    "
                  >

                    <Trash2 size={18} />

                  </button>

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}