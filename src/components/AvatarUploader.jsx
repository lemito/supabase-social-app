import { useState, useEffect } from 'react'
import userApi from 'a/user'
import useStore from 'h/useStore'

export const AvatarUploader = () => {
  const { user, setUser, setLoading, setError } = useStore(
    ({ user, setUser, setLoading, setError }) => ({
      user,
      setUser,
      setLoading,
      setError
    })
  )
  const [file, setFile] = useState('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(!file)
  }, [file])

  const upload = (e) => {
    e.preventDefault()
    if (disabled) return
    setLoading(true)
    userApi
      .uploadAvatar(user.id, file)
      .then((user) => {
        setUser(user)
      })
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }

  if (!user) return null

  return (
    <div className='avatar-uploader'>
      <form className='avatar-uploader' onSubmit={upload}>
        <label htmlFor='avatar'>Avatar:</label>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0])
            }
          }}
        />
        <button disabled={disabled}>Upload</button>
      </form>
    </div>
  )
}
