import { Protected, UserUpdater } from 'c'
import useStore from 'h/useStore'

export const Profile = () => {
  const user = useStore(({ user }) => user)

  return (
    <Protected>
      <h1>Profile</h1>
      <div className='user-data'>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <UserUpdater />
    </Protected>
  )
}
