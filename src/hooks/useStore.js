import create from 'zustand'
import dbApi from 'a/db'

const useStore = create((set, get) => ({
  loading: true,
  error: null,
  user: null,
  users: [],
  posts: [],
  comments: [],
  likes: [],
  postsByUser: [],
  userByPost: {},
  commentsByPost: [],
  likesByPost: [],
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setUser: (user) => set({ user }),
  getCommentsByPost(posts, comments) {
    const commentsByPost = posts.reduce((obj, post) => {
      obj[post.id] = comments.filter((comment) => comment.post_id === post.id)
      return obj
    }, {})
    set({ commentsByPost })
  },
  getLikesByPost(posts, likes) {
    const likesByPost = posts.reduce((obj, post) => {
      obj[post.id] = likes.filter((like) => like.post_id === post.id)
      return obj
    }, {})
    set({ likesByPost })
  },
  getPostsByUser(users, posts) {
    const postsByUser = users.reduce((obj, user) => {
      obj[user.id] = posts.filter((post) => post.user_id === user.id)
      return obj
    }, {})
    set({ postsByUser })
  },
  getUserByPost(users, posts) {
    const userByPost = posts.reduce((obj, post) => {
      obj[post.id] = users.find((user) => user.id === post.user_id).username
      return obj
    }, {})
    set({ userByPost })
  },
  async fetchAllData() {
    set({ loading: true })
    const { getCommentsByPost, getLikesByPost, getPostsByUser, getUserByPost } =
      get()
    const { users, posts, comments, likes } = await dbApi.fetchAllData()
    set({ users })
    set({ posts })
    set({ comments })
    set({ likes })
    getCommentsByPost(posts, comments)
    getLikesByPost(posts, likes)
    getPostsByUser(users, posts)
    getUserByPost(users, posts)
    set({ loading: false })
  }
}))

export default useStore
