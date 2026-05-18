import {
  Pencil,
  Trash2,
  Search,
  School,
  Building2,
  CheckCircle2,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
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

  const [categoryFilter, setCategoryFilter] =
    useState('All')

  const [teamData, setTeamData] =
    useState<any[]>([])

  const [currentPage, setCurrentPage] =
    useState(1)

  const [isEditOpen, setIsEditOpen] =
    useState(false)

  const [selectedItem, setSelectedItem] =
    useState<any>(null)

  const itemsPerPage = 10

  // FETCH

  useEffect(() => {

    fetchSchools()

  }, [])

  const fetchSchools = async () => {

    try {

      const response =
        await api.get('/schools')

      setTeamData(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  // DELETE

  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete =
      window.confirm(
        'Are you sure want to delete?'
      )

    if (!confirmDelete) return

    try {

      await api.delete(
        `/schools/${id}`
      )

      setTeamData(

        teamData.filter(
          (item) =>
            item.id !== id
        )
      )

    } catch (error) {

      console.log(error)
    }
  }

  // EDIT OPEN

  const handleEdit = (item: any) => {

    setSelectedItem(item)

    setIsEditOpen(true)
  }

  // SAVE

  const handleSave = async () => {

    try {

      await api.put(

        `/schools/${selectedItem.id}`,

        selectedItem
      )

      setTeamData(

        teamData.map((item) =>

          item.id ===
          selectedItem.id

            ? selectedItem

            : item
        )
      )

      setIsEditOpen(false)

    } catch (error) {

      console.log(error)
    }
  }

  // FILTER

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

      const matchesCategory =

        categoryFilter === 'All'

          ? true

          : item.school_category ===
            categoryFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      )
    })

  // PAGINATION

  const totalPages =
    Math.ceil(
      filteredData.length /
      itemsPerPage
    )

  const startIndex =
    (currentPage - 1) *
    itemsPerPage

  const currentData =
    filteredData.slice(
      startIndex,
      startIndex + itemsPerPage
    )

  // CATEGORY

  const categories = [

    'All',

    ...new Set(

      teamData.map(
        (item) =>
          item.school_category
      )
    ),
  ]

  // COMPLETED COUNT

  const activeCount =
    teamData.filter(

      (item) =>

        item.centenary_celebration_status ===
        'Completed'

    ).length

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* BACK */}

      <div className="mb-6">

        <BackButton />

      </div>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">

          Community Team Dashboard

        </h1>

        <p className="text-slate-500 mt-2 text-lg">

          Manage school celebration data

        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* TOTAL */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex justify-between items-center">

          <div>

            <p className="text-slate-500">

              Total Schools

            </p>

            <h2 className="text-4xl font-bold mt-2">

              {teamData.length}

            </h2>

          </div>

          <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">

            <School size={30} />

          </div>

        </div>

        {/* COMPLETED */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex justify-between items-center">

          <div>

            <p className="text-slate-500">

              Celebration Completed

            </p>

            <h2 className="text-4xl font-bold mt-2">

              {activeCount}

            </h2>

          </div>

          <div className="bg-green-100 p-4 rounded-2xl text-green-600">

            <CheckCircle2 size={30} />

          </div>

        </div>

        {/* DISTRICT */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex justify-between items-center">

          <div>

            <p className="text-slate-500">

              Districts

            </p>

            <h2 className="text-4xl font-bold mt-2">

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

      {/* SEARCH FILTER */}

      <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-5 mb-8">

        <div className="flex flex-col xl:flex-row gap-4">

          {/* SEARCH */}

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

          {/* STATUS */}

          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 h-16 min-w-[220px]">

            <Filter
              size={20}
              className="text-slate-400"
            />

            <select

              value={statusFilter}

              onChange={(e) => {

                setStatusFilter(
                  e.target.value
                )

                setCurrentPage(1)
              }}

              className="bg-transparent flex-1 ml-4 outline-none text-lg"
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

          {/* CATEGORY */}

          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 h-16 min-w-[260px]">

            <School
              size={20}
              className="text-slate-400"
            />

            <select

              value={categoryFilter}

              onChange={(e) => {

                setCategoryFilter(
                  e.target.value
                )

                setCurrentPage(1)
              }}

              className="bg-transparent flex-1 ml-4 outline-none text-lg"
            >

              {

                categories.map(
                  (
                    category,
                    index
                  ) => (

                    <option
                      key={index}
                      value={category}
                    >

                      {category}

                    </option>
                  )
                )
              }

            </select>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-[32px] overflow-x-auto shadow-xl border border-slate-200">

        {/* HEADER */}

        <div className="min-w-[2400px] grid grid-cols-12 bg-blue-600 text-white px-6 py-5 font-semibold text-lg">

          <div>S.No</div>

          <div>District</div>

          <div>Block Name</div>

          <div>UDISE Code</div>

          <div>School Name</div>

          <div>School Category</div>

          <div>Management</div>

          <div>Status</div>

          <div>Date</div>

          <div>Meeting</div>

          <div>Committee</div>

          <div>Action</div>

        </div>

        {/* BODY */}

        {

          currentData.map(
            (item, index) => (

              <div
                key={item.id}
                className="
                  min-w-[2400px]
                  grid grid-cols-12
                  px-6 py-5
                  border-b border-slate-200
                  items-center
                  hover:bg-slate-50
                "
              >

                <div>

                  {
                    startIndex +
                    index +
                    1
                  }

                </div>

                <div>

                  {item.district}

                </div>

                <div>

                  {item.block_name}

                </div>

                <div>

                  {item.udise_code}

                </div>

                <div>

                  {item.school_name}

                </div>

                <div>

                  {item.school_category}

                </div>

                <div>

                  {item.management_category}

                </div>

                {/* STATUS */}

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

                {/* DATE */}

                <div>

                  {item.celebration_date}

                </div>

                {/* MEETING */}

                <div>

                  <span
                    className={`
                      px-4 py-2 rounded-xl text-sm font-semibold
                      ${
                        item.meeting_conducted_status ===
                        'Yes'

                          ? 'bg-green-100 text-green-700'

                          : 'bg-red-100 text-red-700'
                      }
                    `}
                  >

                    {
                      item.meeting_conducted_status
                    }

                  </span>

                </div>

                {/* COMMITTEE */}

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

                {/* ACTION */}

                <div className="flex gap-3">

                  <button

                    onClick={() =>
                      handleEdit(item)
                    }

                    className="bg-blue-100 text-blue-600 p-3 rounded-xl hover:bg-blue-200"
                  >

                    <Pencil size={18} />

                  </button>

                  <button

                    onClick={() =>
                      handleDelete(
                        item.id
                      )
                    }

                    className="bg-red-100 text-red-600 p-3 rounded-xl hover:bg-red-200"
                  >

                    <Trash2 size={18} />

                  </button>

                </div>

              </div>
            )
          )
        }

      </div>

      {/* PAGINATION */}

      <div className="flex items-center justify-center gap-4 mt-8">

        <button

          disabled={
            currentPage === 1
          }

          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }

          className="bg-white border border-slate-200 px-5 py-3 rounded-2xl disabled:opacity-50"
        >

          <ChevronLeft size={18} />

        </button>

        <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold">

          Page {currentPage} / {totalPages}

        </div>

        <button

          disabled={
            currentPage === totalPages
          }

          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }

          className="bg-white border border-slate-200 px-5 py-3 rounded-2xl disabled:opacity-50"
        >

          <ChevronRight size={18} />

        </button>

      </div>

      {/* EDIT MODAL */}

      {

        isEditOpen &&
        selectedItem && (

          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-y-auto p-6">

            <div className="bg-white p-8 rounded-3xl w-full max-w-4xl">

              {/* HEADER */}

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold text-slate-800">

                  Edit School Details

                </h2>

                <button
                  onClick={() =>
                    setIsEditOpen(false)
                  }
                  className="bg-slate-100 p-2 rounded-xl"
                >

                  <X />

                </button>

              </div>

              {/* FORM */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="font-medium">

                    District

                  </label>

                  <input
                    type="text"
                    value={selectedItem.district || ''}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        district:
                          e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl mt-2"
                  />

                </div>

                <div>

                  <label className="font-medium">

                    Block Name

                  </label>

                  <input
                    type="text"
                    value={selectedItem.block_name || ''}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        block_name:
                          e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl mt-2"
                  />

                </div>

                <div>

                  <label className="font-medium">

                    UDISE Code

                  </label>

                  <input
                    type="text"
                    value={selectedItem.udise_code || ''}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        udise_code:
                          e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl mt-2"
                  />

                </div>

                <div>

                  <label className="font-medium">

                    School Name

                  </label>

                  <input
                    type="text"
                    value={selectedItem.school_name || ''}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        school_name:
                          e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl mt-2"
                  />

                </div>

                <div>

                  <label className="font-medium">

                    School Category

                  </label>

                  <input
                    type="text"
                    value={selectedItem.school_category || ''}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        school_category:
                          e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl mt-2"
                  />

                </div>

                <div>

                  <label className="font-medium">

                    Management Category

                  </label>

                  <input
                    type="text"
                    value={selectedItem.management_category || ''}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        management_category:
                          e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl mt-2"
                  />

                </div>

                <div>

                  <label className="font-medium">

                    Celebration Status

                  </label>

                  <select
                    value={
                      selectedItem.centenary_celebration_status || ''
                    }
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        centenary_celebration_status:
                          e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl mt-2"
                  >

                    <option value="Completed">

                      Completed

                    </option>

                    <option value="Pending">

                      Pending

                    </option>

                  </select>

                </div>

                <div>

                  <label className="font-medium">

                    Celebration Date

                  </label>

                  <input
                    type="date"
                    value={
                      selectedItem.celebration_date || ''
                    }
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        celebration_date:
                          e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl mt-2"
                  />

                </div>

                <div>

                  <label className="font-medium">

                    Meeting Conducted

                  </label>

                  <select
                    value={
                      selectedItem.meeting_conducted_status || ''
                    }
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        meeting_conducted_status:
                          e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl mt-2"
                  >

                    <option value="Yes">

                      Yes

                    </option>

                    <option value="No">

                      No

                    </option>

                  </select>

                </div>

                <div>

                  <label className="font-medium">

                    Committee Formed

                  </label>

                  <select
                    value={
                      selectedItem.committee_formed_status || ''
                    }
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        committee_formed_status:
                          e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl mt-2"
                  >

                    <option value="Yes">

                      Yes

                    </option>

                    <option value="No">

                      No

                    </option>

                  </select>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-4 mt-10">

                <button
                  onClick={() =>
                    setIsEditOpen(false)
                  }
                  className="px-6 py-3 rounded-xl bg-gray-200 font-semibold"
                >

                  Cancel

                </button>

                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold"
                >

                  Save Changes

                </button>

              </div>

            </div>

          </div>
        )
      }

    </div>
  )
}