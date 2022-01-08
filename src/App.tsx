import { Flex } from '@chakra-ui/react'
import Home from 'components/Home'
import Login from 'components/Login'
import { useAuth } from './contexts/authContext'

const App = () => {
  const { user } = useAuth()
  return <Flex direction="column">{user ? <Home /> : <Login />}</Flex>
}

export default App
