import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

function Blog() {
  const { id } = useParams()

  const { axios } = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    content: '',
  })

  const fetchBlogData = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      if (data.success) {
        setData(data.blog)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }, [id, axios])

  const fetchComments = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/blog/comments/${id}`)
      console.log(data)
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }, [id, axios])

  const addComment = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/blog/add-comment', {
        blog: id,
        name: formData.name,
        content: formData.content,
      })

      if (data.success) {
        toast.success(data.message)
        setFormData({
          name: '',
          content: '',
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [id, fetchBlogData, fetchComments])

  console.log(data)
  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt="gradient"
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}{' '}
        </p>
        <h2 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h2>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subtitle}</h2>
        <p className="badge">Michael Brown</p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img
          src={data.image}
          alt="blog thumbnail"
          className="rounded-3xl mb-5"
        />
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="rich-text max-w-3xl mx-auto"
        />
        {/* comments */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="user icon" className="w-6" />
                  <p className="font-medium">{comment.name}</p>
                </div>
                <p>{comment.content}</p>
                <div>{Moment(comment.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* comment form */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              type="text"
              placeholder="Enter your name"
              required
              name="name"
              className="border border-gray-300 rounded-md outline-none w-full  p-2"
              onChange={handleOnChange}
            />
            <textarea
              placeholder="Comment"
              name="content"
              className="border border-gray-300 rounded-md  outline-none w-full  p-2 h-48"
              onChange={handleOnChange}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white rounded py-2 px-8 hover:scale-102 transition-transform cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* social media icons */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Share on</p>
          <div className="flex">
            <img src={assets.facebook_icon} alt="facebook icon" />
            <img src={assets.twitter_icon} alt="twitter icon" />
            <img src={assets.googleplus_icon} alt="google icon" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  )
}

export default Blog
