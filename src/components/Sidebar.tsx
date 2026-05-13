export default function Sidebar() {

  return (

    <div className="w-64 bg-blue-700 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        RMS
      </h1>

      <ul className="space-y-4">

        <li className="hover:text-blue-200 cursor-pointer">
          Dashboard
        </li>

        <li className="hover:text-blue-200 cursor-pointer">
          Employees
        </li>

        <li className="hover:text-blue-200 cursor-pointer">
          Reports
        </li>

      </ul>

    </div>
  )
}