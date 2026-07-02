import { useState } from "react"
import { Link } from "react-router-dom"
import { useGetJobsQuery } from "../services/jobApi"

function Jobs() {
  const { data, isLoading, isError } = useGetJobsQuery()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [jobType, setJobType] = useState("all")

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
  )

  if (isError) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">❌ Jobs load nahi hui!</p>
    </div>
  )

  // Filter Logic
  const filteredJobs = data?.data?.filter((job) => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                         job.location.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === "all" || job.category === category
    const matchType = jobType === "all" || job.jobType === jobType
    return matchSearch && matchCategory && matchType
  })

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">All Jobs</h1>

        {/* Search + Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Job title ya location dhundo..."
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 mb-4"
          />

          <div className="flex gap-4 flex-wrap">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500">
              <option value="all">Sab Categories</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Design">Design</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500">
              <option value="all">Sab Types</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
              <option value="remote">Remote</option>
            </select>

            {(search || category !== "all" || jobType !== "all") && (
              <button
                onClick={() => { setSearch(""); setCategory("all"); setJobType("all") }}
                className="text-red-500 hover:underline text-sm font-semibold px-3">
                ✕ Clear Filters
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-400 mb-6">
          {filteredJobs?.length || 0} jobs mile
        </p>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs?.map((job) => (
            <div key={job._id}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl">
                  {job.company?.company?.[0] || "C"}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {job.company?.company || "Company"}
                  </h4>
                  <p className="text-gray-400 text-sm">{job.location}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-3">{job.title}</h3>

              <div className="flex gap-2 flex-wrap mb-4">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{job.jobType}</span>
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">{job.category}</span>
                {job.salary && (
                  <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">{job.salary}</span>
                )}
              </div>

              <Link to={`/jobs/${job._id}`}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-xl font-semibold transition">
                View Details
              </Link>
            </div>
          ))}
        </div>

        {filteredJobs?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">Koi job nahi mili! Filters change karo</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Jobs