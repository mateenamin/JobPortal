function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name}! 👋
        </h1>
        <p className="text-gray-400 mb-8">Admin Dashboard</p>
      </div>
    </div>
  )
}

export default AdminDashboard