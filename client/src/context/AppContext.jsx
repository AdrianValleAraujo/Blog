import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/blog/all')
      data.success ? setBlogs(data.blogs) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
      axios.defaults.headers.common['Authorization'] = `${token}`
    }
  }, [])

  const value = {
    axios,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    navigate,
    loading,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line
export const useAppContext = () => {
  return useContext(AppContext)
}
