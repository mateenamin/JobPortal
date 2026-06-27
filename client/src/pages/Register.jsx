import { useState } from "react"
import { Link } from "react-router-dom"

function Register() {
  const [role, setRole] = useState("jobseeker")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    phone: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ ...formData, role })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold">
            Job<span className="text-blue-600">Portal</span>
          </h1>
          <p className="text-gray-400 mt-2">Naya account banao!</p>
        </div>

        {/* Role Select */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setRole("jobseeker")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              role === "jobseeker"
                ? "bg-white text-blue-600 shadow"
                : "text-gray-500"
            }`}>
            Job Seeker
          </button>
          <button
            onClick={() => setRole("company")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              role === "company"
                ? "bg-white text-blue-600 shadow"
                : "text-gray-500"
            }`}>
            Company
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="text-gray-600 text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Apna naam"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Company Name — sirf company ke liye */}
          {role === "company" && (
            <div className="mb-4">
              <label className="text-gray-600 text-sm font-semibold">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company ka naam"
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="text-gray-600 text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@gmail.com"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-600 text-sm font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="03XX-XXXXXXX"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-600 text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
            Register
          </button>

        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Account hai?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login karo
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register