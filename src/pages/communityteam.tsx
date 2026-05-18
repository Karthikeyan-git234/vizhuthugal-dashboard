import {
  Pencil,
  Trash2,
  Search,
  School,
  Building2,
  CheckCircle2,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import axios from 'axios'

import BackButton from '../components/BackButton'

export default function CommunityTeam() {

  const [search, setSearch] =
    useState('')

  const [teamData, setTeamData] =
    useState<any[]>([])

  // Fetch Data From Backend

  useEffect(() => {

    fetchSchools()

  }, [])

  const fetchSchools = async () => {

    try {

      const response =
        await axios.get(

          'https://YOUR-BACKEND-URL/api/schools'
        )

      setTeamData(
        response.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  // Search Filter

  const filteredData =
    teamData.filter((item) =>

      item.school_name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )

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

        {/* Active */}

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

        {/* Districts */}

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

      {/* Search */}

      <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-5 mb-8">

        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 h-16">

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

      </div>

      {/* Table */}

      <div className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-200">

        {/* Header */}

        <div className="grid grid-cols-6 bg-blue-600 text-white px-6 py-5 font-semibold text-lg">

          <div>S.No</div>

          <div>District</div>

          <div>Category</div>

          <div>School Name</div>

          <div>Status</div>

          <div>Action</div>

        </div>

        {/* Body */}

        {

          filteredData.map(
            (item, index) => (

              <div
                key={item.id}

                className="
                  grid grid-cols-6
                  px-6 py-5
                  border-b border-slate-200
                  items-center
                  hover:bg-slate-50
                  transition
                "
              >

                <div className="font-semibold text-slate-700">

                  {index + 1}

                </div>

                <div className="text-slate-700">

                  {item.district}

                </div>

                <div className="text-slate-700">

                  {item.school_category}

                </div>

                <div className="font-medium text-slate-800">

                  {item.school_name}

                </div>

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