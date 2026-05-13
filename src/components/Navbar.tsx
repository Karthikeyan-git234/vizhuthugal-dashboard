import {
  Bell,
} from 'lucide-react'

export default function Navbar() {

  return (

    <div className="bg-blue-600 h-16 rounded-2xl px-6 flex items-center justify-between text-white shadow-md">

      <h1 className="text-2xl font-bold">
        Vizhuthugal
      </h1>

      <Bell />

    </div>
  )
}