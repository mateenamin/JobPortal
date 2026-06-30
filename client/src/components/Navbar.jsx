import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      <Link to="/" className="text-2xl font-bold">
        Job<span className="text-blue-600">Portal</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
        <Link to="/jobs" className="text-gray-600 hover:text-blue-600">Jobs</Link>

        {user ? (
          <>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-semibold">
              Dashboard
            </Link>
            <span className="text-gray-600">👤 {user.name}</span>
            <button onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
              Login
            </Link>
            <Link to="/register" className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition">
              Register
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar