import { Layout, Form } from 'c'
import { useStore } from 'h'
import userApi from 'a/user'
import { useNavigate } from 'react-router-dom'

const fields = [
  {
    id: 'username',
    label: 'Username',
    type: 'text'
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email'
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password'
  },
  {
    id: 'confirmPassword',
    label: 'Confirm password',
    type: 'password'
  }
]

export const Register = () => {
  const { setUser, setLoading, setError } = useStore(
    ({ setUser, setLoading, setError }) => ({ setUser, setLoading, setError })
  )
  const navigate = useNavigate()

  const register = async (data) => {
    setLoading(true)
    userApi
      .register(data)
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
    <Layout>
      <h1>Register</h1>
      <Form fields={fields} submit={register} button='Register' />
    </Layout>
  )
}
