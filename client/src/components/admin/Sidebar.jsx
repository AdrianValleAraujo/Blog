import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

function Sidebar() {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <NavLink
        to="/admin"
        end={true}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && 'bg-primary/10 border-r-4 border-primary'
          }`
        }
      >
        <img src={assets.home_icon} alt="home icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink
        to="/admin/addBlog"
        end={true}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && 'bg-primary/10 border-r-4 border-primary'
          }`
        }
      >
        <img src={assets.add_icon} alt="add icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add blogs</p>
      </NavLink>
      <NavLink
        to="/admin/listBlog"
        end={true}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && 'bg-primary/10 border-r-4 border-primary'
          }`
        }
      >
        <img src={assets.list_icon} alt="list icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Blog lists</p>
      </NavLink>
      <NavLink
        to="/admin/comments"
        end={true}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && 'bg-primary/10 border-r-4 border-primary'
          }`
        }
      >
        <img
          src={assets.comment_icon}
          alt="comment icon"
          className="min-w-4 w-5"
        />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
