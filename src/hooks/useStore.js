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
  likes: [],
  allPostsWithCommentAndLikeCount: [],
  postsById: [],
  postsByUser: [],
  userByPost: {},
  commentsByPost: [],
  likesByPost: [],
  edit: false,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setUser: (user) => set({ user }),
  getCommentsByPost() {
    const { posts, comments } = get()
    const commentsByPost = posts.reduce((obj, post) => {
      obj[post.id] = comments.filter((comment) => comment.post_id === post.id)
      return obj
    }, {})
    set({ commentsByPost })
  },
  getLikesByPost() {
    const { posts, likes } = get()
    const likesByPost = posts.reduce((obj, post) => {
      obj[post.id] = likes.filter((like) => like.post_id === post.id)
      return obj
    }, {})
    set({ likesByPost })
  },
  getPostsByUser() {
    const { users, posts, commentsByPost, likesByPost } = get()
    const postsByUser = users.reduce((obj, user) => {
      obj[user.id] = posts
        .filter((post) => post.user_id === user.id)
        .map((post) => ({
          ...post,
          editable: true,
          commentCount: commentsByPost[post.id].length,
          likeCount: likesByPost[post.id].length
        }))
      return obj
    }, {})
    set({ postsByUser })
  },
  getUserByPost() {
    const { users, posts } = get()
    const userByPost = posts.reduce((obj, post) => {
      obj[post.id] = users.find((user) => user.id === post.user_id).username
      return obj
    }, {})
    set({ userByPost })
  },
  getAllPostsWithCommentAndLikeCount() {
    const { posts, user, userByPost, commentsByPost, likesByPost } = get()
    const allPostsWithCommentAndLikeCount = posts.map((post) => ({
      ...post,
      editable: user.id === post.user_id,
      author: userByPost[post.id],
      commentCount: commentsByPost[post.id].length,
      likeCount: likesByPost[post.id].length
    }))
    set({ allPostsWithCommentAndLikeCount })
  },
  getPostsById() {
    const { posts, user, userByPost, commentsByPost, likesByPost } = get()
    const postsById = posts.reduce((obj, post) => {
      obj[post.id] = {
        ...post,
        comments: commentsByPost[post.id],
        likes: likesByPost[post.id],
        likeCount: likesByPost[post.id].length
      }
      if (post.user_id === user.id) {
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
      getLikesByPost,
      getPostsByUser,
      getUserByPost,
      getAllPostsWithCommentAndLikeCount,
      getPostsById
    } = get()
    const { users, posts, comments, likes } = await dbApi.fetchAllData()
    set({ users, posts, comments, likes })
    getCommentsByPost()
    getLikesByPost()
    getPostsByUser()
    getUserByPost()
    getAllPostsWithCommentAndLikeCount()
    getPostsById()
    set({ loading: false })
  },
  removePost(id) {
    set({ loading: true })
    postApi
      .remove(id)
      .catch((error) => set({ error }))
      .finally(() => {
        set({ loading: false })
      })
  },
  setEdit(edit) {
    set({ edit })
  }
}))

export default useStore
