import postApi from 'a/post'
import { Form, Layout, Loader, Protected } from 'c'
import useStore from 'h/useStore'
import { useNavigate, useParams } from 'react-router-dom'

const fields = [
  {
    id: 'title',
    label: 'Title',
    type: 'text'
  },
  {
    id: 'content',
    label: 'Content',
    type: 'text'
  }
]

export const Post = () => {
  const { id } = useParams()
  const {
    loading,
    setLoading,
    setError,
    postsById,
    removePost,
    edit,
    setEdit
  } = useStore(
    ({
      loading,
      setLoading,
      setError,
      postsById,
      removePost,
      edit,
      setEdit
    }) => ({
      loading,
      setLoading,
      setError,
      postsById,
      removePost,
      edit,
      setEdit
    })
  )
  const post = postsById[id]
  const navigate = useNavigate()

  if (loading) return <Loader />

  const update = (data) => {
    setLoading(true)
    postApi
      .update(data, post.id)
      .then(() => {
        setEdit(false)
      })
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }

  if (edit) {
    return (
      <Protected>
        <h2>Update post</h2>
        <Form fields={fields} submit={update} button='Update' />
      </Protected>
    )
  }

  return (
    <Layout className='post'>
      <h4>{post.title}</h4>
      {post.editable ? (
        <div>
          <button
            onClick={() => {
              setEdit(true)
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              removePost(post.id)
              navigate('/blog')
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <p>Author: {post.author.username}</p>
      )}
      <p>{post.created_at}</p>
      <p>{post.content}</p>
      <p>Likes: {post.likeCount}</p>
    </Layout>
  )
}
