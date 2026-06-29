import JobSeekerDashboard from "../components/dashboard/JobSeekerDashboard"
import CompanyDashboard from "../components/dashboard/CompanyDashboard"
import AdminDashboard from "../components/dashboard/AdminDashboard"

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) return <Navigate to="/login" />

  return (
    <div>
      {user.role === "jobseeker" && <JobSeekerDashboard />}
      {user.role === "company" && <CompanyDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </div>
  )
}

export default Dashboard