import fs from 'fs'
import imagekit from '../configs/imageKit.js'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import main from '../configs/gemini.js'

export const addBlog = async (req, res) => {
  try {
    const { title, subtitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    )

    const imageFile = req.file
    // check if all fields are present
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: 'Missing required fields' })
    }

    const fileBuffer = fs.createReadStream(imageFile.path)
    // upload image to imagekit
    const response = await imagekit.files.upload({
      file: fileBuffer, // buffer o base64
      fileName: imageFile.originalname,
      folder: '/blogs',
    })

    const optimizationImageUrl = imagekit.helper.buildSrc({
      src: response.url,
      transformation: [
        {
          quality: 'auto',
          format: 'webp',
          width: 1280,
        },
      ],
    })

    // Result: https://ik.imagekit.io/your_imagekit_id/path/to/image.jpg?tr=w-400,h-300,c-maintain_ratio,q-80,f-webp
    await Blog.create({
      title,
      subtitle,
      description,
      category,
      image: optimizationImageUrl,
      isPublished,
    })

    res.json({ success: true, message: 'Blog added successsfully' })
  } catch (error) {
    console.error('❌ Upload error:', error)
    res.json({ success: false, message: error.message })
  }
}

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
    res.json({ success: true, blogs })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const getBlogByid = async (req, res) => {
  try {
    const { blogId } = req.params
    const blog = await Blog.findById(blogId)
    if (!blog) return res.json({ success: false, message: 'Blog not found' })
    res.json({ success: true, blog })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const deleteBlogByid = async (req, res) => {
  try {
    const { id } = req.body
    await Blog.findByIdAndDelete(id)
    // delete all comments associated with the blog
    await Comment.deleteMany({ blog: id })
    res.json({ success: true, message: 'Blog deleted successsfully' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body
    const blog = await Blog.findById(id)
    blog.isPublished = !blog.isPublished
    await blog.save()
    res.json({ success: true, message: 'Blog status updated successsfully' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body
    await Comment.create({
      blog,
      name,
      content,
    })
    res.json({ success: true, message: 'Comment added  for review' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params
    const comments = await Comment.find({ blog: blogId, isApprove: true }).sort(
      {
        createdAt: -1,
      }
    )
    res.json({ success: true, comments })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body
    const content = await main(
      prompt +
        'Generate a blog content for this topic in simple text format. Avoid returning any extra text or introductory phrases.'
    )
    res.json({ success: true, content })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
