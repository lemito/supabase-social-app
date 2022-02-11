import './styles/app.scss'
import { Routes, Route } from 'react-router-dom'
import { Home, About, Register, Login, UpdateUser } from 'p'
import { Nav } from 'c'
import { useEffect } from 'react'
import { useStore } from 'h'
import userApi from 'a/user'

function App() {
  const { user, setUser, setLoading } = useStore(
    ({ user, setUser, setLoading }) => ({
      user,
      setUser,
      setLoading
    })
  )

  useEffect(() => {
    if (!user) {
      setLoading(true)
      const user = userApi.get()
      setUser(user)
      setLoading(false)
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
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/update-user' element={<UpdateUser />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
