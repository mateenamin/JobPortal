import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-blue-100 text-xl mb-8 max-w-xl mx-auto">
          Pakistan ki best companies mein apna career shuru karo!
        </p>

        {/* Search Bar */}
        <div className="flex max-w-2xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Job title, skills dhundo..."
            className="flex-1 px-6 py-4 text-gray-700 outline-none"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-semibold transition">
            Search
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 mt-12">
          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-blue-200">Jobs Available</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">200+</h3>
            <p className="text-blue-200">Companies</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">1000+</h3>
            <p className="text-blue-200">Job Seekers</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "IT", icon: "💻", count: "120 Jobs" },
            { name: "Marketing", icon: "📢", count: "80 Jobs" },
            { name: "Design", icon: "🎨", count: "60 Jobs" },
            { name: "Sales", icon: "📊", count: "90 Jobs" },
          ].map((cat) => (
            <div key={cat.name}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 text-center cursor-pointer border border-gray-100">
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1">{cat.name}</h3>
              <p className="text-gray-400 text-sm">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Latest Jobs
          </h2>
          <Link to="/jobs" className="text-blue-600 hover:underline font-semibold">
            Sab Jobs Dekho →
          </Link>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">

              {/* Company */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl">
                  C
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Company Name</h4>
                  <p className="text-gray-400 text-sm">Lahore, Pakistan</p>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                React Developer
              </h3>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                  Full Time
                </span>
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                  IT
                </span>
                <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                  50k - 80k
                </span>
              </div>

              {/* Apply Button */}
              <Link to={`/jobs/${i}`}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-xl font-semibold transition">
                Apply Now
              </Link>

            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Company Ho? Job Post Karo!
        </h2>
        <p className="text-blue-100 mb-8 max-w-md mx-auto">
          Hazaron job seekers tak apni job pahunchao!
        </p>
        <Link to="/register"
          className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-bold transition">
          Company Register Karo
        </Link>
      </section>

    </div>
  )
}

export default Home