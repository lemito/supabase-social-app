import { Layout, Form, AvatarUploader } from 'c'
import { useStore } from 'h'
import userApi from 'a/user'
import { useNavigate } from 'react-router-dom'

const fields = [
  {
    id: 'first_name',
    label: 'First Name',
    type: 'text'
  },
  {
    id: 'last_name',
    label: 'Last Name',
    type: 'text'
  },
  {
    id: 'age',
    label: 'Age',
    type: 'number'
  }
]

export const UpdateUser = () => {
  const { user, setUser, setLoading, setError } = useStore(
    ({ user, setUser, setLoading, setError }) => ({
      user,
      setUser,
      setLoading,
      setError
    })
  )
  const navigate = useNavigate()

  const updateUser = async (data) => {
    setLoading(true)
    userApi
      .update(data)
      .then((user) => {
        setUser(user)
        navigate('/')
      })
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Layout className='page-update-user'>
      <h1>Update User</h1>
      <AvatarUploader />
      <Form fields={fields} submit={updateUser} button='Update' />
    </Layout>
  )
}
