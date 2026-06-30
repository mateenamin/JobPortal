import {
  useGetAdminJobsQuery,
  useUpdateJobStatusMutation
} from "../../services/jobApi"

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"))
  const { data, isLoading, refetch } = useGetAdminJobsQuery()
  const [updateStatus] = useUpdateJobStatusMutation()

  const handleStatus = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap()
      refetch()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name}! 👋
        </h1>
        <p className="text-gray-400 mb-8">Admin Panel — Jobs Approve/Reject karo</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-3xl font-bold text-yellow-500">
              {data?.data?.filter(j => j.status === "pending").length || 0}
            </h3>
            <p className="text-gray-400 text-sm">Pending</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-3xl font-bold text-green-600">
              {data?.data?.filter(j => j.status === "approved").length || 0}
            </h3>
            <p className="text-gray-400 text-sm">Approved</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-3xl font-bold text-red-600">
              {data?.data?.filter(j => j.status === "rejected").length || 0}
            </h3>
            <p className="text-gray-400 text-sm">Rejected</p>
          </div>
        </div>

        {/* All Jobs */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          All Jobs ({data?.count || 0})
        </h2>

        {isLoading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {data?.data?.map((job) => (
              <div key={job._id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800">{job.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {job.company?.company} — {job.location}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    job.status === "approved" ? "bg-green-100 text-green-600"
                    : job.status === "rejected" ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {job.status}
                  </span>
                </div>

                {job.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatus(job._id, "approved")}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleStatus(job._id, "rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                      ✕ Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminDashboard