import { Loader } from './Loader'
import { Error } from './Error'
import useStore from 'h/useStore'

export const Layout = ({ children, className }) => {
  const { loading, error } = useStore(({ loading, error }) => ({
    loading,
    error
  }))

  if (loading) return <Loader />

  if (error) return <Error error={error} />

  return <div className={className ? className : ''}>{children}</div>
}
