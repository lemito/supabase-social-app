import { Link } from 'react-router-dom'
import useStore from 'h/useStore'

export const PostTabs = () => {
  const user = useStore(({ user }) => user)

  return (
    <nav className='post-tabs'>
      <ul>
        <li>
          <Link to='/blog'>All</Link>
        </li>
        {user && (
          <>
            <li>
              <Link to='/blog/my-posts'>My</Link>
            </li>
            <li>
              <Link to='/blog/new-post'>New</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
