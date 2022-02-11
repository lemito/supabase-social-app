import { Link } from 'react-router-dom'
import { useStore } from 'h'
import userApi from '../api/user'

export const Nav = () => {
  const { user, setUser, setLoading, setError } = useStore(
    ({ user, setUser, setLoading, setError }) => ({
      user,
      setUser,
      setLoading,
      setError
    })
  )

  const logout = () => {
    setLoading(true)
    userApi
      .logout()
      .then(setUser)
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/update-user'>Update</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
