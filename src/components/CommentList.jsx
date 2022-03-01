import { useState } from 'react'
import useStore from 'h/useStore'
import commentApi from 'a/comment'
import { Form } from 'c'
import { VscEdit, VscTrash } from 'react-icons/vsc'

export const CommentList = ({ comments }) => {
  const { user, setLoading, setError } = useStore(
    ({ user, setLoading, setError }) => ({ user, setLoading, setError })
  )
  const [editComment, setEditComment] = useState(null)

  const remove = (id) => {
    setLoading(true)
    commentApi
      .remove(id)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  const update = (data) => {
    setLoading(true)
    commentApi
      .update({ id: editComment.id, data })
      .catch(setError)
      .finally(() => setLoading(false))
  }

  if (editComment) {
    const fields = [
      {
        id: 'content',
        label: 'Content',
        type: 'text',
        value: editComment.content
      }
    ]
    return (
      <div>
        <h3>Update comment</h3>
        <Form fields={fields} submit={update} button='Update' />
      </div>
    )
  }

  return (
    <div className='comment-list'>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div className='comment-item' key={comment.id}>
          <p>{comment.content}</p>
          {comment.user_id === user?.id ? (
            <div>
              <button onClick={() => setEditComment(comment)} className='info'>
                <VscEdit />
              </button>
              <button onClick={() => remove(comment.id)} className='danger'>
                <VscTrash />
              </button>
            </div>
          ) : (
            <p className='author'>Author: {comment.author}</p>
          )}
          <p className='date'>
            {new Date(comment.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}
