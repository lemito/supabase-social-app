import postApi from 'a/post'
import { Form, Layout, PostList, PostTabs, Protected } from 'c'
import useStore from 'h/useStore'
import { useEffect, useState } from 'react'

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
    postsByUser,
    allPostsWithCommentAndLikeCount,
    setLoading,
    setError
  } = useStore(
    ({
      user,
      postsByUser,
      userByPost,
      commentsByPost,
      likesByPost,
      allPostsWithCommentAndLikeCount,
      setLoading,
      setError
    }) => ({
      user,
      postsByUser,
      userByPost,
      commentsByPost,
      likesByPost,
      allPostsWithCommentAndLikeCount,
      setLoading,
      setError
    })
  )
  const [_posts, setPosts] = useState([])
  const [tab, setTab] = useState('all')

  const create = (data) => {
    data.user_id = user?.id
    setLoading(true)
    postApi
      .create(data)
      .then(() => {
        setTab('my')
      })
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (tab === 'new') return
    const _posts =
      tab === 'my' ? postsByUser[user.id] : allPostsWithCommentAndLikeCount
    setPosts(_posts)
  }, [tab, allPostsWithCommentAndLikeCount])

  if (tab === 'new') {
    return (
      <Protected>
        <PostTabs setTab={setTab} />
        <h2>New post</h2>
        <Form fields={fields} submit={create} button='Create' />
      </Protected>
    )
  }

  return (
    <Layout>
      <PostTabs setTab={setTab} />
      <h2>{tab === 'my' ? 'My' : 'All'} posts</h2>
      <PostList posts={_posts} />
    </Layout>
  )
}
