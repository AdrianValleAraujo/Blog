import { useState } from 'react'
import { blogCategories } from '../assets/assets'
// eslint-disable-next-line
import { motion } from 'motion/react'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'
import Loader from './Loader'

function BlogList() {
  const [menu, setMenu] = useState('All')
  const { blogs, input, loading } = useAppContext()

  const filteredBlogs = () => {
    if (input === '') return blogs
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    )
  }

  const isEmpty =
    filteredBlogs().filter((blog) =>
      menu === 'All' ? true : blog.category === menu
    ).length > 0

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((category) => (
          <div key={category.id} className="relative">
            <button
              onClick={() => setMenu(category)}
              className={`
                cursor-pointer text-gray-500
                ${menu === category && 'text-white px-4 pt-0.5'}
                `}
            >
              {category}
              {menu === category && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>
      {/* blog cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40 min-h-10">
        {isEmpty ? (
          filteredBlogs()
            .filter((blog) => (menu === 'All' ? true : blog.category === menu))
            .map((blog) => {
              return (
                <motion.div
                  key={blog._id}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              )
            })
        ) : (
          <p className="text-center text-gray-600 col-span-4 mx-auto w-full text-2xl  md:text-3xl">
            No blogs founds
          </p>
        )}
      </div>
    </div>
  )
}

export default BlogList
