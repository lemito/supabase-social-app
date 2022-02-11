import create from 'zustand'

export const useStore = create((set, get) => ({
  loading: false,
  error: null,
  user: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setUser: (user) => set({ user })
}))
