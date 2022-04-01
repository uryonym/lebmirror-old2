import Home from 'components/Home'
import Login from 'components/Login'
import { useEffect } from 'react'
import { useAuth } from '../contexts/authContext'

const App = () => {
  const { user } = useAuth()

  useEffect(() => {
    document.oncontextmenu = () => false
  }, [])

  return user ? <Home /> : <Login />
}

export default App
