import supabase from 's'

const create = async (commentData) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([commentData])
      .single()
    if (error) throw error
    return data
  } catch (e) {
    throw e
  }
}

const update = async ({ id, data: commentData }) => {
  try {
    const user = supabase.auth.user()
    if (!user) return
    const { data, error } = await supabase
      .from('comments')
      .update({ ...commentData })
      .match({ id, user_id: user.id })
    if (error) throw error
    return data
  } catch (e) {
    throw e
  }
}

const remove = async (id) => {
  const user = supabase.auth.user()
  if (!user) return
  try {
    const { error } = await supabase
      .from('comments')
      .delete()
      .match({ id, user_id: user.id })
    if (error) throw error
  } catch (e) {
    throw e
  }
}

const commentApi = { create, update, remove }
export default commentApi
