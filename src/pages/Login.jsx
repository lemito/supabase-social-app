import { Layout, Form } from 'c'
import useStore from 'h/useStore'
import userApi from 'a/user'
import { useNavigate } from 'react-router-dom'

const fields = [
  {
    id: 'email',
    label: 'Email',
    type: 'email'
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password'
  }
]

export const Login = () => {
  const { setUser, setLoading, setError } = useStore(
    ({ setUser, setLoading, setError }) => ({ setUser, setLoading, setError })
  )
  const navigate = useNavigate()

  const register = async (data) => {
    setLoading(true)
    userApi
      .login(data)
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
      <h1>Login</h1>
      <Form fields={fields} submit={register} button='Login' />
    </Layout>
  )
}
