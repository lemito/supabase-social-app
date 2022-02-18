import useStore from 'h/useStore'
import { Layout, Protected, PostTabs, PostList, Form } from 'c'
import { useParams } from 'react-router-dom'
import postApi from 'a/post'
import { useNavigate } from 'react-router-dom'

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

export const Blog = () => {
  const {
    user,
    posts,
    postsByUser,
    userByPost,
    commentsByPost,
    likesByPost,
    setLoading,
    setError
  } = useStore(
    ({
      user,
      posts,
      postsByUser,
      userByPost,
      commentsByPost,
      likesByPost,
      setLoading,
      setError
    }) => ({
      user,
      posts,
      postsByUser,
      userByPost,
      commentsByPost,
      likesByPost,
      setLoading,
      setError
    })
  )
  const slug = useParams()['*']
  const navigate = useNavigate()

  const create = (data) => {
    data.user_id = user.id
    setLoading(true)
    postApi
      .create(data)
      .then(() => {
        navigate('/blog/my-posts')
      })
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }

  let _posts = []
  switch (slug) {
    case 'my-posts':
      if (user) {
        _posts = postsByUser[user.id]
        break
      }
    default:
      _posts = posts.map((post) => ({
        ...post,
        author: userByPost[post.id],
        commentCount: commentsByPost[post.id]?.length,
        likeCount: likesByPost[post.id]?.length
      }))
      break
  }

  return (
    <Layout>
      <PostTabs />
      <h2>{slug === 'my-posts' ? 'My' : 'All'} posts</h2>
      <PostList posts={_posts} />
    </Layout>
  )
}
