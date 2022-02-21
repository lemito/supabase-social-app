import { Link, useNavigate } from 'react-router-dom'
import useStore from 'h/useStore'

const PostItem = ({ post }) => {
  const { removePost, setEdit } = useStore(({ removePost, setEdit }) => ({
    removePost,
    setEdit
  }))
  const navigate = useNavigate()

  return (
    <Link
      to={`/blog/post/${post.id}`}
      className='post-item'
      onClick={(e) => {
        if (e.target.localName === 'button') {
          e.preventDefault()
        }
      }}
    >
      <h4>{post.title}</h4>
      {post.editable && (
        <div>
          <button
            onClick={() => {
              setEdit(true)
              navigate(`/post/${post.id}`)
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              removePost(post.id)
            }}
          >
            Remove
          </button>
        </div>
      )}
      <p>Author: {post.author}</p>
      <p>{post.created_at}</p>
      <p>{post.commentCount}</p>
      <p>{post.likeCount}</p>
    </Link>
  )
}

export const PostList = ({ posts }) => (
  <div className='post-list'>
    {posts.length ? (
      posts.map((post) => <PostItem key={post.id} post={post} />)
    ) : (
      <h4>No posts</h4>
    )}
  </div>
)
