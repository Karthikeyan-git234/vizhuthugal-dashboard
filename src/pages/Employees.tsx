import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function Employees() {

  const employees = [
    {
      id: 1,
      name: 'Karthikeyan',
      role: 'Developer',
    },

    {
      id: 2,
      name: 'Arun',
      role: 'Designer',
    },
  ]

  return (

    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        <Navbar />

        <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">

          <h1 className="text-2xl font-bold mb-5">
            Employees
          </h1>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  ID
                </th>

                <th className="text-left py-3">
                  Name
                </th>

                <th className="text-left py-3">
                  Role
                </th>

              </tr>

            </thead>

            <tbody>

              {employees.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="py-4">
                    {item.id}
                  </td>

                  <td className="py-4">
                    {item.name}
                  </td>

                  <td className="py-4">
                    {item.role}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}