import postApi from 'a/post'
import commentApi from 'a/comment'
import { Form, Protected, CommentList } from 'c'
import useStore from 'h/useStore'
import { useNavigate, useParams } from 'react-router-dom'
import { VscEdit, VscTrash } from 'react-icons/vsc'

const createCommentFields = [
  {
    id: 'content',
    label: 'Content',
    type: 'text'
  }
]

export const Post = () => {
  const { id } = useParams()
  const {
    user,
    setLoading,
    setError,
    postsById,
    removePost,
    editPost,
    setEditPost
  } = useStore(
    ({
      user,
      setLoading,
      setError,
      postsById,
      removePost,
      editPost,
      setEditPost
    }) => ({
      user,
      setLoading,
      setError,
      postsById,
      removePost,
      editPost,
      setEditPost
    })
  )
  const post = postsById[id]
  const navigate = useNavigate()

  const updatePost = (data) => {
    setLoading(true)
    postApi
      .update({ id: post.id, data })
      .then(() => {
        setEditPost(false)
      })
      .catch(setError)
  }

  const createComment = (data) => {
    data.user_id = user?.id
    data.post_id = post.id
    setLoading(true)
    commentApi.create(data).catch(setError)
  }

  if (editPost) {
    const editPostFields = [
      {
        id: 'title',
        label: 'Title',
        type: 'text',
        value: post.title
      },
      {
        id: 'content',
        label: 'Content',
        type: 'text',
        value: post.content
      }
    ]
    return (
      <Protected>
        <h2>Update post</h2>
        <Form fields={editPostFields} submit={updatePost} button='Update' />
      </Protected>
    )
  }

  return (
    <div className='page post'>
      <h1>Post</h1>
      {post && (
        <div className='post-item' style={{ width: '512px' }}>
          <h2>{post.title}</h2>
          {post.editable ? (
            <div>
              <button
                onClick={() => {
                  setEditPost(true)
                }}
                className='info'
              >
                <VscEdit />
              </button>
              <button
                onClick={() => {
                  removePost(post.id)
                  navigate('/blog')
                }}
                className='danger'
              >
                <VscTrash />
              </button>
            </div>
          ) : (
            <p>Author: {post.author}</p>
          )}
          <p className='date'>{new Date(post.created_at).toLocaleString()}</p>
          <p>{post.content}</p>
          {user && (
            <div className='new-comment'>
              <h3>New comment</h3>
              <Form
                fields={createCommentFields}
                submit={createComment}
                button='Create'
              />
            </div>
          )}
          {post.comments.length > 0 && <CommentList comments={post.comments} />}
        </div>
      )}
    </div>
  )
}
