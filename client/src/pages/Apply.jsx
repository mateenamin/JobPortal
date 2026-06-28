import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetJobQuery } from "../services/jobApi"
import { useApplyJobMutation } from "../services/applicationApi"

function Apply() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [coverLetter, setCoverLetter] = useState("")

  const { data } = useGetJobQuery(id)
  const job = data?.data

  const [applyJob, { isLoading, isError, error }] = useApplyJobMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await applyJob({ id, coverLetter }).unwrap()
      alert("Apply ho gaya! 🎉")
      navigate("/jobs")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-6 flex items-center gap-2">
          ← Wapas Jao
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Apply Karo
          </h1>

          {job && (
            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <p className="font-semibold text-blue-600">{job.title}</p>
              <p className="text-gray-500 text-sm">
                {job.company?.company} — {job.location}
              </p>
            </div>
          )}

          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-500 p-3 rounded-xl mb-4 text-sm">
              ❌ {error?.data?.message || "Kuch ghalat hua!"}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="text-gray-600 text-sm font-semibold">
                Cover Letter
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Apne baare mein likho — experience, skills, kyun apply kar rahe ho..."
                rows={6}
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50">
              {isLoading ? "Applying..." : "Apply Now 🚀"}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Apply