import Home from 'components/Home'
import Login from 'components/Login'
import { useAuth } from './contexts/authContext'

const App = () => {
  const { user } = useAuth()

  return user ? <Home /> : <Login />
}

export default App
