import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "../services/authApi"
import { jobApi } from "../services/jobApi"
import { applicationApi } from "../services/applicationApi"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(jobApi.middleware)
      .concat(applicationApi.middleware),
})