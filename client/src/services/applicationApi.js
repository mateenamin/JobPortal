import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) headers.set("authorization", `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({

    applyJob: builder.mutation({
      query: ({ id, coverLetter }) => ({
        url: `/applications/apply/${id}`,
        method: "POST",
        body: { coverLetter },
      }),
    }),

    getMyApplications: builder.query({
      query: () => "/applications/my",
    }),

  }),
})

export const {
  useApplyJobMutation,
  useGetMyApplicationsQuery,
} = applicationApi