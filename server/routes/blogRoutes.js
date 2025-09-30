import express from 'express'
import {
  addBlog,
  addComment,
  deleteBlogByid,
  generateContent,
  getAllBlogs,
  getBlogByid,
  getBlogComments,
  togglePublish,
} from '../controllers/blogController.js'
import upload from '../middlewares/multer.js'
import auth from '../middlewares/auth.js'

const blogRouter = express.Router()

blogRouter.post('/add', upload.single('image'), auth, addBlog)
blogRouter.get('/all', getAllBlogs)
blogRouter.get('/:blogId', getBlogByid)
blogRouter.post('/delete', auth, deleteBlogByid)
blogRouter.post('/toggle-publish', auth, togglePublish)

blogRouter.post('/add-comment', addComment)
blogRouter.get('/comments/:blogId', getBlogComments)

blogRouter.post('/generate', auth, generateContent)

export default blogRouter
