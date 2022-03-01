import { Form, AvatarUploader } from 'c'
import useStore from 'h/useStore'
import userApi from 'a/user'

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

export const UserUpdater = () => {
  const { user, setUser, setLoading, setError } = useStore(
    ({ user, setUser, setLoading, setError }) => ({
      user,
      setUser,
      setLoading,
      setError
    })
  )

  const updateUser = async (data) => {
    data.id = user.id
    setLoading(true)
    userApi
      .update(data)
      .then(setUser)
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className='user-updater'>
      <h2>Update User</h2>
      <AvatarUploader />
      <Form fields={fields} submit={updateUser} button='Update' />
    </div>
  )
}
