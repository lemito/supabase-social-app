import supabase from 's'
import serializeUser from 'u/serializeUser'

const get = () => {
  const user = serializeUser(supabase.auth.user())
  console.log(user)
  if (user) return user
  return null
}

const register = async (data) => {
  const { email, password, username } = data
  try {
    const { user, error } = await supabase.auth.signUp(
      {
        email,
        password
      },
      {
        data: {
          username
        }
      }
    )
    if (error) throw error
    return serializeUser(user)
  } catch (e) {
    throw e
  }
}

const login = async (data) => {
  try {
    const { user, error } = await supabase.auth.signIn(data)
    if (error) throw error
    return serializeUser(user)
  } catch (e) {
    throw e
  }
}

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return null
  } catch (e) {
    throw e
  }
}

const update = async (data) => {
  try {
    const { user, error } = await supabase.auth.update(data)
    if (error) throw error
    return serializeUser(user)
  } catch (e) {
    throw e
  }
}

const uploadAvatar = async (userId, file) => {
  const ext = file.name.split('.').at(-1)
  const name = userId + '.' + ext
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(name, file, {
        upsert: true
      })
    if (error) throw error
    const { publicUrl, error: publicUrlError } = await supabase.storage
      .from('avatars')
      .getPublicUrl(data['Key'])
    if (error) throw publicUrlError
    console.log(publicUrl)
    const user = await update({ avatar: data.key })
    return serializeUser(user)
  } catch (e) {
    throw e
  }
}

const userApi = { get, register, login, logout, update, uploadAvatar }

export default userApi
