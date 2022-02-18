import './styles/app.scss'
import { Routes, Route } from 'react-router-dom'
import { Home, About, Register, Login, Profile, Blog } from 'p'
import { Nav } from 'c'
import { useEffect } from 'react'
import useStore from 'h/useStore'
import userApi from 'a/user'

function App() {
  const { user, setUser, setLoading, fetchAllData } = useStore(
    ({ user, setUser, setLoading, fetchAllData }) => ({
      user,
      setUser,
      setLoading,
      fetchAllData
    })
  )

  useEffect(() => {
    if (!user) {
      setLoading(true)
      const user = userApi.get()
      setUser(user)
      fetchAllData()
    }
  }, [])

  return (
    <div className='app'>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog/*' element={<Blog />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
