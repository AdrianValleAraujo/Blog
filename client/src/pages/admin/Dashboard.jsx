import { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

function Dashboard() {
  const { axios } = useAppContext()

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  })

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard')
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <section className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-transform">
          <img src={assets.dashboard_icon_1} alt="blogs icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-transform">
          <img src={assets.dashboard_icon_2} alt="comments icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-transform">
          <img src={assets.dashboard_icon_3} alt="drafts icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>
      {/* table title */}
      <div>
        <div className="flex items-center gap-3 my-6">
          <img src={assets.dashboard_icon_4} alt="Latest blog icon" />
          <p>Latest Blogs</p>
        </div>
        <div className="admin-table scrollbar-hide max-w-4xl!">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  blog={blog}
                  fetchBlogs={fetchDashboardData}
                  index={index + 1}
                  key={blog._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
