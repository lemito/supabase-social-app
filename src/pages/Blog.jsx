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
  const { user, postsByUser, allPostsWithCommentCount, setLoading, setError } =
    useStore(
      ({
        user,
        postsByUser,
        allPostsWithCommentCount,
        setLoading,
        setError
      }) => ({
        user,
        postsByUser,
        allPostsWithCommentCount,
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
      tab === 'my' ? postsByUser[user.id] : allPostsWithCommentCount
    setPosts(_posts)
  }, [tab, allPostsWithCommentCount])

  if (tab === 'new') {
    return (
      <Protected className='page new-post'>
        <h1>Blog</h1>
        <PostTabs tab={tab} setTab={setTab} />
        <h2>New post</h2>
        <Form fields={fields} submit={create} button='Create' />
      </Protected>
    )
  }

  return (
    <div className='page blog'>
      <h1>Blog</h1>
      <PostTabs tab={tab} setTab={setTab} />
      <h2>{tab === 'my' ? 'My' : 'All'} posts</h2>
      <PostList posts={_posts} />
    </div>
  )
}
