import useStore from 'h/useStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from './Layout'

export const Protected = ({ children, className }) => {
  const { user, loading } = useStore(({ user, loading }) => ({ user, loading }))
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/')
    }
  }, [user, loading])

  return <Layout className={className}>{children}</Layout>
}
