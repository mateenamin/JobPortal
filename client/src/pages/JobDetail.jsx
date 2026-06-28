import { Link, useParams, useNavigate } from "react-router-dom"
import { useGetJobQuery } from "../services/jobApi"

function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const { data, isLoading, isError } = useGetJobQuery(id)
  const job = data?.data

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
  )

  if (isError || !job) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">❌ Job nahi mili!</p>
    </div>
  )

  const handleApply = () => {
    if (!user) {
      navigate("/login")
    } else {
      navigate(`/apply/${id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-6 flex items-center gap-2">
          ← Wapas Jao
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="bg-blue-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-blue-600 font-bold text-2xl">
                {job.company?.company?.[0] || "C"}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <p className="text-blue-100">
                  {job.company?.company || "Company"} — {job.location}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-3 flex-wrap">
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                {job.jobType}
              </span>
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                {job.category}
              </span>
              {job.salary && (
                <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                  💰 {job.salary}
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-8">

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Job Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Skills */}
            {job.skills?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Required Skills
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {job.skills.map((skill, i) => (
                    <span key={i}
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Company Info */}
            <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Company Info
              </h2>
              <p className="text-gray-600">
                <span className="font-semibold">Company: </span>
                {job.company?.company || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Email: </span>
                {job.company?.email || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Location: </span>
                {job.location}
              </p>
            </div>

            {/* Apply Button */}
            {user?.role === "jobseeker" && (
              <button
                onClick={handleApply}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition">
                Apply Now 🚀
              </button>
            )}

            {!user && (
              <div className="text-center">
                <p className="text-gray-400 mb-4">Apply karne ke liye login karo!</p>
                <Link to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition">
                  Login Karo
                </Link>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}

export default JobDetail