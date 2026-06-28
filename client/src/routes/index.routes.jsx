import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Layouts
import UserLayout from "../layout/UserLayout"

// User Pages
import Home from "../pages/Home"
import Jobs from "../pages/Jobs"
import JobDetail from "../pages/JobDetail"
import Apply from "../pages/Apply"
import Login from "../pages/Login"
import Register from "../pages/Register"

// Protected Pages
import Dashboard from "../pages/Dashboard"

// 404
import NotFound from "../pages/NotFound"

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "jobs", element: <Jobs /> },
        { path: "jobs/:id", element: <JobDetail /> },
        { path: "apply/:id", element: <Apply /> },
        { path: "dashboard", element: <Dashboard /> },
      ]
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <NotFound /> }
  ])

  return <RouterProvider router={router} />
}

export default Router