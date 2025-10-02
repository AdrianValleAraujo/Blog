import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

function Login() {
  const { axios, setToken } = useAppContext()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/admin/login', formData)
      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = `${data.token}`
        toast.success('Login successful')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h2 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h2>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>
          {/* form */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="email@gmail.com"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="$Password123"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-colors"
            >
              Login
            </button>
          </form>
          {/* credentials demo */}
          <footer className="bg-orange-400/10 shadow w-full p-4 mt-4 rounded">
            <h4 className="text-md font-bold">Demo credentials:</h4>
            <p className="text-gray-500">
              Email: <span className="font-semibold">admin@example.com</span>
            </p>
            <p className="text-gray-500">
              Password: <span className="font-semibold">francoblog</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Login
