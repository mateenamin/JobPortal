import { Link } from "react-router-dom"
import { useGetJobsQuery } from "../services/jobApi"

function Jobs() {
  const { data, isLoading, isError } = useGetJobsQuery()

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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          All Jobs
          <span className="text-gray-400 text-lg font-normal ml-2">
            ({data?.count || 0} jobs)
          </span>
        </h1>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((job) => (
            <div key={job._id}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">

              {/* Company */}
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

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {job.title}
              </h3>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                  {job.jobType}
                </span>
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                  {job.category}
                </span>
                {job.salary && (
                  <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {job.salary}
                  </span>
                )}
              </div>

              {/* Button */}
              <Link to={`/jobs/${job._id}`}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-xl font-semibold transition">
                View Details
              </Link>

            </div>
          ))}
        </div>

        {/* No Jobs */}
        {data?.data?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">Koi job nahi mili!</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Jobs