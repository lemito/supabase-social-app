import supabase from 's'

const create = async (postData) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .single()
    if (error) throw error
    return data
  } catch (e) {
    throw e
  }
}

const update = async (data) => {
  try {
    const user = supabase.auth.user()
    if (!user) return
    const { data: _data, error } = await supabase
      .from('posts')
      .update({ ...postData })
      .match({ id: data.id, user_id: user.id })
    if (error) throw error
    return _data
  } catch (e) {
    throw e
  }
}

const remove = async (id) => {
  try {
    const user = supabase.auth.user()
    if (!user) return
    const { error } = await supabase
      .from('posts')
      .delete()
      .match({ id, user_id: user.id })
    if (error) throw error
  } catch (e) {
    throw e
  }
}

const postApi = { create, update, remove }

export default postApi
