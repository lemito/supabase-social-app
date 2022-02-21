import { Link } from 'react-router-dom'
import useStore from 'h/useStore'

export const PostTabs = ({ setTab }) => {
  const user = useStore(({ user }) => user)

  return (
    <nav className='post-tabs'>
      <ul>
        <li>
          <button onClick={() => setTab('all')}>All</button>
        </li>
        {user && (
          <>
            <li>
              <button onClick={() => setTab('my')}>My</button>
            </li>
            <li>
              <button onClick={() => setTab('new')}>New</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
