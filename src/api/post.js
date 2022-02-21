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

const update = async (postData, id) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ ...postData })
      .match({ id })
    if (error) throw error
    return data
  } catch (e) {
    throw e
  }
}

const remove = async (id) => {
  try {
    const { error } = await supabase.from('posts').delete().match({ id })
    if (error) throw error
  } catch (e) {
    throw e
  }
}

const postApi = { create, update, remove }
export default postApi
