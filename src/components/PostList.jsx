import { Link } from 'react-router-dom'

const PostItem = ({ post }) => (
  <Link to='/blog/post/:id' className='post-item'>
    <h4>{post.title}</h4>
    <p>Author: {post.author}</p>
    <p>{post.created_at}</p>
    <p>{post.commentCount}</p>
    <p>{post.likeCount}</p>
  </Link>
)

export const PostList = ({ posts }) => (
  <div className='post-list'>
    {posts.length ? (
      posts.map((post) => <PostItem key={post.id} post={post} />)
    ) : (
      <h4>No posts</h4>
    )}
  </div>
)
