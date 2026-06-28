// import { useState } from "react"
// import { Link } from "react-router-dom"

// function Login() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [role, setRole] = useState("jobseeker")

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log({ email, password, role })
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
//       <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

//         {/* Logo */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-extrabold">
//             Job<span className="text-blue-600">Portal</span>
//           </h1>
//           <p className="text-gray-400 mt-2">Welcome back!</p>
//         </div>

//         {/* Role Select */}
//         <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
//           <button
//             onClick={() => setRole("jobseeker")}
//             className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
//               role === "jobseeker"
//                 ? "bg-white text-blue-600 shadow"
//                 : "text-gray-500"
//             }`}>
//             Job Seeker
//           </button>
//           <button
//             onClick={() => setRole("company")}
//             className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
//               role === "company"
//                 ? "bg-white text-blue-600 shadow"
//                 : "text-gray-500"
//             }`}>
//             Company
//           </button>
//           <button
//             onClick={() => setRole("admin")}
//             className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
//               role === "admin"
//                 ? "bg-white text-blue-600 shadow"
//                 : "text-gray-500"
//             }`}>
//             Admin
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="text-gray-600 text-sm font-semibold">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="email@gmail.com"
//               className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
//             />
//           </div>

//           <div className="mb-6">
//             <label className="text-gray-600 text-sm font-semibold">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
//             Login
//           </button>
//         </form>

//         <p className="text-center text-gray-400 text-sm mt-6">
//           Account nahi hai?{" "}
//           <Link to="/register" className="text-blue-600 font-semibold">
//             Register karo
//           </Link>
//         </p>

//       </div>
//     </div>
//   )
// }

// export default Login



import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../services/authApi"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("jobseeker")
  const navigate = useNavigate()

  const [login, { isLoading, isError, error }] = useLoginMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await login({ email, password, role }).unwrap()
      localStorage.setItem("token", result.token)
      localStorage.setItem("user", JSON.stringify(result.user))
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold">
            Job<span className="text-blue-600">Portal</span>
          </h1>
          <p className="text-gray-400 mt-2">Welcome back!</p>
        </div>

        {/* Role Select */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {["jobseeker", "company", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition ${
                role === r ? "bg-white text-blue-600 shadow" : "text-gray-500"
              }`}>
              {r === "jobseeker" ? "Job Seeker" : r}
            </button>
          ))}
        </div>

        {/* Error */}
        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-500 p-3 rounded-xl mb-4 text-sm">
            ❌ {error?.data?.message || "Kuch ghalat hua!"}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-600 text-sm font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-600 text-sm font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Account nahi hai?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register karo
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login