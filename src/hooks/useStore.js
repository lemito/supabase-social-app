import create from 'zustand'
import dbApi from 'a/db'
import postApi from 'a/post'

const useStore = create((set, get) => ({
  loading: true,
  error: null,
  user: null,

  users: [],
  posts: [],
  comments: [],

  postsById: {},
  postsByUser: {},
  userByPost: {},
  commentsByPost: [],
  allPostsWithCommentCount: [],

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setUser: (user) => set({ user }),

  getCommentsByPost() {
    const { users, posts, comments } = get()
    const commentsByPost = posts.reduce((obj, post) => {
      obj[post.id] = comments
        .filter((comment) => comment.post_id === post.id)
        .map((comment) => ({
          ...comment,
          author: users.find((user) => user.id === comment.user_id).user_name
        }))
      return obj
    }, {})
    set({ commentsByPost })
  },
  getPostsByUser() {
    const { users, posts, commentsByPost } = get()
    const postsByUser = users.reduce((obj, user) => {
      obj[user.id] = posts
        .filter((post) => post.user_id === user.id)
        .map((post) => ({
          ...post,
          editable: true,
          commentCount: commentsByPost[post.id].length
        }))
      return obj
    }, {})
    set({ postsByUser })
  },
  getUserByPost() {
    const { users, posts } = get()
    const userByPost = posts.reduce((obj, post) => {
      obj[post.id] = users.find((user) => user.id === post.user_id).user_name
      return obj
    }, {})
    set({ userByPost })
  },
  getAllPostsWithCommentCount() {
    const { posts, user, userByPost, commentsByPost } = get()
    const allPostsWithCommentCount = posts.map((post) => ({
      ...post,
      editable: user?.id === post.user_id,
      author: userByPost[post.id],
      commentCount: commentsByPost[post.id].length
    }))
    set({ allPostsWithCommentCount })
  },
  getPostsById() {
    const { posts, user, userByPost, commentsByPost } = get()
    const postsById = posts.reduce((obj, post) => {
      obj[post.id] = {
        ...post,
        comments: commentsByPost[post.id],
        commentCount: commentsByPost[post.id]
      }
      if (post.user_id === user?.id) {
        obj[post.id].editable = true
      } else {
        obj[post.id].author = userByPost[post.id]
      }
      return obj
    }, {})
    set({ postsById })
  },

  async fetchAllData() {
    set({ loading: true })
    const {
      getCommentsByPost,
      getPostsByUser,
      getUserByPost,
      getAllPostsWithCommentCount,
      getPostsById
    } = get()

    const { users, posts, comments } = await dbApi.fetchAllData()

    set({ users, posts, comments })

    getCommentsByPost()
    getPostsByUser()
    getUserByPost()
    getAllPostsWithCommentCount()
    getPostsById()

    set({ loading: false })
  },

  editPost: false,
  setEditPost(editPost) {
    set({ editPost })
  },
  removePost(id) {
    set({ loading: true })
    postApi
      .remove(id)
      .catch((error) => set({ error }))
      .finally(() => {
        set({ loading: false })
      })
  }
}))

export default useStore
