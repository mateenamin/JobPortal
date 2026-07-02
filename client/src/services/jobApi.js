import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({

    // Get all jobs
    getJobs: builder.query({
      query: () => "/jobs",
    }),

    // Get single job
    getJob: builder.query({
      query: (id) => `/jobs/${id}`,
    }),

    // Post job — company
    postJob: builder.mutation({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
    }),

    // Admin all jobs
    getAdminJobs: builder.query({
      query: () => "/jobs/admin/all",
    }),

    // Admin approve/reject
    updateJobStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/jobs/admin/${id}/status`,
        method: "PUT",
        body: { status },
      }),
    }),
    getCompanyJobs: builder.query({
  query: () => "/jobs/company/myjobs",
}),

getJobApplicants: builder.query({
  query: (jobId) => `/applications/job/${jobId}`,
}),

updateApplicationStatus: builder.mutation({
  query: ({ id, status }) => ({
    url: `/applications/${id}/status`,
    method: "PUT",
    body: { status },
  }),
}),
updateJob: builder.mutation({
  query: ({ id, data }) => ({
    url: `/jobs/${id}`,
    method: "PUT",
    body: data,
  }),
}),

deleteJob: builder.mutation({
  query: (id) => ({
    url: `/jobs/${id}`,
    method: "DELETE",
  }),
}),

  }),
})

export const {
  useGetJobsQuery,
  useGetJobQuery,
  usePostJobMutation,
  useGetAdminJobsQuery,
  useUpdateJobStatusMutation,
  useGetCompanyJobsQuery,
  useGetJobApplicantsQuery,
  useUpdateApplicationStatusMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi