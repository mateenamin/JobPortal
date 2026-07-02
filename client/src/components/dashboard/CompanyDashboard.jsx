import { useState } from "react"
import {
  useGetCompanyJobsQuery,
  usePostJobMutation,
  useGetJobApplicantsQuery,
  useUpdateApplicationStatusMutation,
  useUpdateJobMutation,
  useDeleteJobMutation
} from "../../services/jobApi"

function CompanyDashboard() {
  const user = JSON.parse(localStorage.getItem("user"))
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [formData, setFormData] = useState({
    title: "", description: "", location: "", category: "IT",
    salary: "", jobType: "fulltime", skills: ""
  })

  const { data, isLoading, refetch } = useGetCompanyJobsQuery()
  const [postJob, { isLoading: posting }] = usePostJobMutation()
  const [updateJob, { isLoading: updating }] = useUpdateJobMutation()
  const [deleteJob] = useDeleteJobMutation()

  const { data: applicants, isLoading: loadingApplicants } = useGetJobApplicantsQuery(
    selectedJob, { skip: !selectedJob }
  )
  const [updateAppStatus] = useUpdateApplicationStatusMutation()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Edit button click
  const handleEditClick = (job) => {
    setEditingJob(job._id)
    setFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      category: job.category,
      salary: job.salary,
      jobType: job.jobType,
      skills: job.skills?.join(", ") || ""
    })
    setShowForm(true)
  }

  // New job button click
  const handleNewJobClick = () => {
    setEditingJob(null)
    setFormData({ title: "", description: "", location: "", category: "IT", salary: "", jobType: "fulltime", skills: "" })
    setShowForm(!showForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const skillsArray = formData.skills.split(",").map(s => s.trim())

      if (editingJob) {
        // Update existing job
        await updateJob({ id: editingJob, data: { ...formData, skills: skillsArray } }).unwrap()
      } else {
        // Create new job
        await postJob({ ...formData, skills: skillsArray }).unwrap()
      }

      setShowForm(false)
      setEditingJob(null)
      setFormData({ title: "", description: "", location: "", category: "IT", salary: "", jobType: "fulltime", skills: "" })
      refetch()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Yeh job delete karna chahte ho?")) return
    try {
      await deleteJob(id).unwrap()
      refetch()
    } catch (err) {
      console.log(err)
    }
  }

  const handleAppStatus = async (id, status) => {
    try {
      await updateAppStatus({ id, status }).unwrap()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {user?.name}! 👋
            </h1>
            <p className="text-gray-400">{user?.company}</p>
          </div>
          <button
            onClick={handleNewJobClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            {showForm ? "✕ Close" : "+ Post Job"}
          </button>
        </div>

        {/* Form — Add ya Edit */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingJob ? "Job Edit Karo" : "Naya Job Post Karo"}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500" />
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500" />
            </div>
            <textarea name="description" value={formData.description} onChange={handleChange}
              placeholder="Job Description" required rows={4}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 mb-4 resize-none" />
            <div className="grid grid-cols-3 gap-4 mb-4">
              <select name="category" value={formData.category} onChange={handleChange}
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500">
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Design">Design</option>
                <option value="Other">Other</option>
              </select>
              <select name="jobType" value={formData.jobType} onChange={handleChange}
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500">
                <option value="fulltime">Full Time</option>
                <option value="parttime">Part Time</option>
                <option value="remote">Remote</option>
              </select>
              <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary"
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500" />
            </div>
            <input name="skills" value={formData.skills} onChange={handleChange}
              placeholder="Skills (comma se separate: React, Node)"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 mb-4" />
            <button type="submit" disabled={posting || updating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50">
              {posting || updating ? "Saving..." : editingJob ? "Update Job" : "Post Job"}
            </button>
          </form>
        )}

        {/* My Jobs */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          My Jobs ({data?.count || 0})
        </h2>

        {isLoading ? (
          <p className="text-gray-400">Loading...</p>
        ) : data?.data?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <p className="text-gray-400">Koi job post nahi ki abhi!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mb-8">
            {data?.data?.map((job) => (
              <div key={job._id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800">{job.title}</h3>
                    <p className="text-gray-400 text-sm">{job.location} — {job.salary}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    job.status === "approved" ? "bg-green-100 text-green-600"
                    : job.status === "rejected" ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {job.status}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-2">
                  <button
                    onClick={() => setSelectedJob(selectedJob === job._id ? null : job._id)}
                    className="text-blue-600 hover:underline text-sm font-semibold">
                    {selectedJob === job._id ? "Applicants Chhupaو ▲" : "Applicants Dekho ▼"}
                  </button>
                  <button
                    onClick={() => handleEditClick(job)}
                    className="text-green-600 hover:underline text-sm font-semibold">
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-red-600 hover:underline text-sm font-semibold">
                    🗑️ Delete
                  </button>
                </div>

                {/* Applicants List */}
                {selectedJob === job._id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {loadingApplicants ? (
                      <p className="text-gray-400 text-sm">Loading applicants...</p>
                    ) : applicants?.data?.length === 0 ? (
                      <p className="text-gray-400 text-sm">Koi applicant nahi abhi!</p>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {applicants?.data?.map((app) => (
                          <div key={app._id} className="bg-gray-50 p-4 rounded-xl">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-semibold text-gray-800">{app.applicant?.name}</p>
                                <p className="text-gray-400 text-xs">{app.applicant?.email}</p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                app.status === "accepted" ? "bg-green-100 text-green-600"
                                : app.status === "rejected" ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                              }`}>
                                {app.status}
                              </span>
                            </div>
                            {app.coverLetter && (
                              <p className="text-gray-600 text-sm mb-3">{app.coverLetter}</p>
                            )}
                            {app.status === "pending" && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleAppStatus(app._id, "accepted")}
                                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition">
                                  ✓ Accept
                                </button>
                                <button
                                  onClick={() => handleAppStatus(app._id, "rejected")}
                                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition">
                                  ✕ Reject
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
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

export default CompanyDashboard