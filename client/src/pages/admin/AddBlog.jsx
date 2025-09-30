import { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { parse } from 'marked'

const categories = {
  STARTUP: 'Startup',
}

function AddBlog() {
  const { axios } = useAppContext()
  const [isAdding, setIsAdding] = useState(false)
  const [generateContentLoading, setGenerateContentLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState(categories.STARTUP)
  const [isPublished, setIsPublished] = useState(false)

  const generateContent = async () => {
    if (!title) return toast.error('Title is required')
    try {
      setGenerateContentLoading(true)
      const { data } = await axios.post('/api/blog/generate', { prompt: title })
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setGenerateContentLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setIsAdding(true)

      const blog = {
        title,
        subtitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      }

      console.log('blog', blog)
      const formData = new FormData()
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const { data } = await axios.post('/api/blog/add', formData)
      if (data.success) {
        toast.success(data.message)
        setImage(false)
        setTitle('')
        setSubtitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  return (
    <form
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
      onSubmit={handleSubmit}
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="upload image"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Blog title"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 rounded outline-none"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          placeholder="Blog title"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 rounded outline-none"
          onChange={(e) => setSubtitle(e.target.value)}
          value={subtitle}
        />
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef} />
          {generateContentLoading ? (
            <div className="absolute top-0 left-0 w-full max-sm:h-[90%] h-[98%] flex items-center justify-center bg-black/30 mt-2">
              <div className="rounded-full h-8 w-8 border border-t-white animate-spin"></div>
            </div>
          ) : null}
          <button
            disabled={generateContentLoading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 max-sm:bottom-7 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5
           rounded hover:underline cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
          >
            {generateContentLoading ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>

        <p className="mt-4" htmlFor="category">
          Blog Category
        </p>
        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select category</option>
          {blogCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="cursor-pointer scale-125"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  )
}

export default AddBlog
