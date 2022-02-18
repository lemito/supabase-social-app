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
  const { setUser, setLoading, setError } = useStore(
    ({ setUser, setLoading, setError }) => ({
      setUser,
      setLoading,
      setError
    })
  )

  const updateUser = async (data) => {
    setLoading(true)
    userApi
      .update(data)
      .then((user) => {
        setUser(user)
      })
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <h2>Update User</h2>
      <AvatarUploader />
      <Form fields={fields} submit={updateUser} button='Update' />
    </div>
  )
}
