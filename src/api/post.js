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

const postApi = { create }
export default postApi
