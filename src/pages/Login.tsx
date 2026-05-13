import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {

    if (
      email === 'resource@gmail.com' &&
      password === 'resource1'
    ) {
      navigate('/dashboard')
    } else {
      alert('Invalid Email or Password')
    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-5">

          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">

            <span className="text-white text-2xl font-bold">
              R
            </span>

          </div>

        </div>

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Welcome Back
          </h1>

          <p className="text-slate-500">
            Login to continue to your dashboard
          </p>

        </div>

        {/* Email */}
        <div className="mb-5">

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition-all"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        {/* Password */}
        <div className="mb-6">

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition-all"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all text-white py-3 rounded-xl font-semibold shadow-lg"
        >
          Sign In
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">

          © 2026 Resource Management System

        </p>

      </div>

    </div>
  )
}