import { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

function Comments() {
  const { axios } = useAppContext()

  const [commentsData, setCommentsData] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments')
      data.success ? setCommentsData(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <section className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h2>Comments</h2>
        <div className="flex gap-4">
          <button
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Approved' ? 'text-primary' : 'text-gray-700'
            }`}
            onClick={() => setFilter('Approved')}
          >
            Approved
          </button>
          <button
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'
            }`}
            onClick={() => setFilter('Not Approved')}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="admin-table scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment{' '}
              </th>
              <th scope="col" className="px-6 py-3 max-sm-hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3 max-sm-hidden">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {commentsData
              .filter((comment) => {
                if (filter === 'Approved') return comment.isApprove
                return !comment.isApprove
              })
              .map((comment) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Comments
