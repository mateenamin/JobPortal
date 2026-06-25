// Layout Kya Hai:

// Layout = Har page pe same cheez!

// Har page pe Navbar hoga ✅
// Har page pe Footer hoga ✅
// Sirf beech ka content badle ga!

// function UserLayout() {
//   return (
//     <div>

//       {/* Yeh har page pe dikhega */}
//       <Navbar />

//       {/* Yeh badle ga — page ke hisaab se */}
//       <Outlet />

//       {/* Yeh har page pe dikhega */}
//       <Footer />

//     </div>
//   )
// }

// Outlet Kya Hai:

// Outlet = Yahan page dikhao!

// Home pe gaye    → Outlet mein Home dikhega
// Jobs pe gaye    → Outlet mein Jobs dikhega
// Login pe gaye   → Outlet mein Login dikhega




// Routes mein Connection:
// {
//   path: "/",
//   element: <UserLayout />,  // ← Layout
//   children: [
//     { path: "", element: <Home /> },   // ← Outlet mein
//     { path: "jobs", element: <Jobs /> } // ← Outlet mein
//   ]
// }

// Simple Flow:
// / pe gaye
//   ↓
// UserLayout chala
//   ↓
// Navbar dikh gaya
//   ↓
// Outlet mein → Home page
//   ↓
// Footer dikh gaya


import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function UserLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default UserLayout