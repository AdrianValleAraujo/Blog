import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

function CommentTableItem({ comment, fetchComments }) {
  const { axios } = useAppContext()
  const { blog, createdAt, _id } = comment
  const blogDate = new Date(createdAt)

  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', {
        id: _id,
      })
      if (data.success) {
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const deleteComment = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this comment?'
    )
    if (!confirm) return
    try {
      const { data } = await axios.post('/api/admin/delete-comment', {
        id: _id,
      })
      if (data.success) {
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <b>Blog</b> : {blog.title}
        <br />
        <br />
        <b>Name </b>: {comment.name}
        <br />
        <b>Comment</b>: {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {blogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-4">
          {!comment.isApprove ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt="tick icon"
              className="w-5 hover:scale-110 transition-transform cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="bin icon"
            className="w-5 hover:scale-110 transition-transform cursor-pointer"
          />
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
