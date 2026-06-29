import { useGetMyApplicationsQuery } from "../../services/applicationApi"

function JobSeekerDashboard() {
  const { data, isLoading } = useGetMyApplicationsQuery()
  const user = JSON.parse(localStorage.getItem("user"))

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name}! 👋
        </h1>
        <p className="text-gray-400 mb-8">Tumhari applications yahan hain</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-3xl font-bold text-blue-600">
              {data?.count || 0}
            </h3>
            <p className="text-gray-400 text-sm">Total Applications</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-3xl font-bold text-green-600">
              {data?.data?.filter(a => a.status === "accepted").length || 0}
            </h3>
            <p className="text-gray-400 text-sm">Accepted</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-3xl font-bold text-yellow-500">
              {data?.data?.filter(a => a.status === "pending").length || 0}
            </h3>
            <p className="text-gray-400 text-sm">Pending</p>
          </div>
        </div>

        {/* Applications */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Applications</h2>

        {data?.data?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <p className="text-gray-400">Koi application nahi — Jobs dekho!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {data?.data?.map((app) => (
              <div key={app._id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800">
                    {app.job?.title || "Job"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {app.job?.location} — {app.job?.salary}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  app.status === "accepted"
                    ? "bg-green-100 text-green-600"
                    : app.status === "rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default JobSeekerDashboard