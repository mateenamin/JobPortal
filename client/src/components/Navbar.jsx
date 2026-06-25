import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Job<span className="text-gray-800">Portal</span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-600 hover:text-blue-600 transition">
          Home
        </Link>
        <Link to="/jobs" className="text-gray-600 hover:text-blue-600 transition">
          Jobs
        </Link>
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
          Login
        </Link>
        <Link to="/register" className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition">
          Register
        </Link>
      </div>

    </nav>
  )
}

export default Navbar