import { useState } from 'react';

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {

    if (
      email === 'resource@gmail.com' &&
      password === 'resource1'
    ) {

      navigate('/dashboard');

    } else {

      alert('Invalid Email or Password');
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-blue-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl p-8 border border-slate-200">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">

          {/* Logo Image */}
          <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">

            <img
              src="/vizhuthugal.png"
              alt="Vizhuthugal Logo"
              className="w-full h-full object-cover"
            />

          </div>

          {/* Tamil Text */}
          <h1 className="mt-5 text-4xl font-bold text-slate-800 tracking-wide">

            விழுதுகள்

          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 text-sm mt-2">

            Alumni Connect

          </p>

        </div>

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Welcome Back
          </h1>

          <p className="text-slate-500 leading-relaxed">
            Login to continue to your dashboard
          </p>
          <p className="text-slate-400 leading-relaxed">
            Email    : resource@gmail.com
            Password : resource1
          </p>

        </div>

        {/* Email */}
        <div className="mb-5">

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Email Address

          </label>

          <div className="relative">

            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none pl-12 pr-4 py-3 rounded-2xl transition-all"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

        </div>

        {/* Password */}
        <div className="mb-6">

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Password

          </label>

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none pl-12 pr-14 py-3 rounded-2xl transition-all"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            {/* Show Password */}
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600 transition"
            >

              {showPassword
                ? <EyeOff size={20} />
                : <Eye size={20} />
              }

            </button>

          </div>

        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all duration-300 text-white py-3 rounded-2xl font-semibold shadow-lg"
        >

          Sign In

        </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">

          © 2026 Resource Management System

        </p>

      </div>

    </div>
  );
}