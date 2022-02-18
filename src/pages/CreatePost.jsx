import useStore from 'h/useStore'
import { Protected, PostTabs, Form } from 'c'
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

export const CreatePost = () => {
  const user = useStore(({ user }) => user)
  const navigate = useNavigate()

  const create = (data) => {
    data.user_id = user?.id
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

  return (
    <Protected>
      <PostTabs />
      <h2>New post</h2>
      <Form fields={fields} submit={create} button='Create' />
    </Protected>
  )
}
